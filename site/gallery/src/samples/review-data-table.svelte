<script lang="ts">
	import ChevronDownIcon from "$lib/components/registry-icons/chevron-down.svelte";
	import {
		FlexRender,
		type RowSelectionState,
		columnFilteringFeature,
		columnVisibilityFeature,
		createColumnHelper,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		createTable,
		createTableState,
		filterFn_includesString,
		renderComponent,
		renderSnippet,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		sortFn_alphanumeric,
		sortFn_text,
		tableFeatures,
	} from "@tanstack/svelte-table";
	import { createRawSnippet } from "svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import DataTableActions from "$lib/registry/examples/data-table/data-table-actions.svelte";
	import DataTableCheckbox from "$lib/registry/examples/data-table/data-table-checkbox.svelte";
	import DataTableEmailButton from "$lib/registry/examples/data-table/data-table-email-button.svelte";

	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	// New in v9: declare the features this table uses — anything you don't
	// register is tree-shaken out of the bundle.
	const features = tableFeatures({
		columnFilteringFeature,
		columnVisibilityFeature,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		filteredRowModel: createFilteredRowModel(),
		paginatedRowModel: createPaginatedRowModel(),
		sortedRowModel: createSortedRowModel(),
		filterFns: { includesString: filterFn_includesString },
		sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
	});

	const columnHelper = createColumnHelper<typeof features, Payment>();

	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "success",
			email: "ken99@example.com",
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "success",
			email: "Abe45@example.com",
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "processing",
			email: "Monserrat44@example.com",
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "success",
			email: "Silas22@example.com",
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "failed",
			email: "carmella@example.com",
		},
	];

	const columns = columnHelper.columns([
		columnHelper.display({
			id: "select",
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Select all rows on this page",
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
					"aria-label": `Select payment for ${row.original.email}`,
				}),
			enableSorting: false,
			enableHiding: false,
		}),
		columnHelper.accessor("status", {
			header: "Status",
			cell: ({ row }) => {
				const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
					const { status } = getStatus();
					return {
						render: () => `<div class="capitalize">${status}</div>`,
					};
				});
				return renderSnippet(statusSnippet, {
					status: row.original.status,
				});
			},
		}),
		columnHelper.accessor("email", {
			header: ({ column }) =>
				renderComponent(DataTableEmailButton, {
					onclick: column.getToggleSortingHandler(),
				}),
			cell: ({ row }) => {
				const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email}</div>`,
					};
				});

				return renderSnippet(emailSnippet, {
					email: row.original.email,
				});
			},
		}),
		columnHelper.accessor("amount", {
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="text-end">Amount</div>`,
					};
				});
				return renderSnippet(amountHeaderSnippet);
			},
			cell: ({ row }) => {
				const formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				});

				const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
					const { amount } = getAmount();
					const formatted = formatter.format(amount);
					return {
						render: () => `<div class="text-end font-medium tabular-nums">${formatted}</div>`,
					};
				});
				return renderSnippet(amountCellSnippet, {
					amount: row.original.amount,
				});
			},
		}),
		columnHelper.display({
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id }),
		}),
	]);

	// Keep row selection outside the table so the rest of the app can read or update it.
	const [rowSelection, setRowSelection] = createTableState<RowSelectionState>({});

	// v9 manages the rest of its state internally — reads like
	// `table.getRowModel()` are rune-reactive, so no `$state` mirrors are needed.
	const table = createTable({
		features,
		get data() {
			return data;
		},
		columns,
		initialState: { pagination: { pageIndex: 0, pageSize: 3 } },
		state: {
			get rowSelection() {
				return rowSelection();
			},
		},
		onRowSelectionChange: setRowSelection,
	});
</script>

<div class="w-full">
	<div class="flex flex-wrap items-end gap-3 py-4">
		<div class="grid min-w-0 flex-1 gap-2">
		<Label for="review-filter-email">Filter by email</Label>
		<Input
			id="review-filter-email"
			placeholder="Filter emails..."
			value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
			oninput={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
			onchange={(e) => {
				table.getColumn("email")?.setFilterValue(e.currentTarget.value);
			}}
			class="w-full min-w-40"
		/>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ms-auto">
						Columns <ChevronDownIcon />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" class="w-44">
				<DropdownMenu.Group>
					{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
						<DropdownMenu.CheckboxItem
							class="capitalize"
							bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
						>
							{column.id}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex (This named horizontal scroll region must be reachable by keyboard.) -->
<div class="table-region overflow-x-auto rounded-md border" role="region" aria-label="Example payments" tabindex="0">
		<Table.Root>
			<Table.Caption class="sr-only">Example payments, with email sorting and row selection.</Table.Caption>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head scope="col" aria-sort={header.column.id === "email" ? (header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : "none") : undefined}>
								{#if !header.isPlaceholder}
									<FlexRender {header} />
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && "selected"}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender {cell} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={table.getVisibleLeafColumns().length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex flex-wrap items-center justify-between gap-3 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} rows selected.
			<span class="block">Page {table.atoms.pagination.get().pageIndex + 1} of {Math.max(1, table.getPageCount())}</span>
		</div>
		<div class="flex flex-wrap gap-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</Button>
		</div>
	</div>
</div>

<style>
	.table-region :global([data-slot="table-container"]) { overflow: visible; }
</style>
