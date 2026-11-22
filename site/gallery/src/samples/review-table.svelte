<script lang="ts">
	import * as Table from "$lib/registry/ui/table/index.js";

	const invoices = [
		{
			invoice: "INV001",
			paymentStatus: "Paid",
			totalAmount: "$250.00",
			paymentMethod: "Credit Card",
		},
		{
			invoice: "INV002",
			paymentStatus: "Pending",
			totalAmount: "$150.00",
			paymentMethod: "PayPal",
		},
		{
			invoice: "INV003",
			paymentStatus: "Unpaid",
			totalAmount: "$350.00",
			paymentMethod: "Bank Transfer",
		},
		{
			invoice: "INV004",
			paymentStatus: "Paid",
			totalAmount: "$450.00",
			paymentMethod: "Credit Card",
		},
		{
			invoice: "INV005",
			paymentStatus: "Paid",
			totalAmount: "$550.00",
			paymentMethod: "PayPal",
		},
		{
			invoice: "INV006",
			paymentStatus: "Pending",
			totalAmount: "$200.00",
			paymentMethod: "Bank Transfer",
		},
		{
			invoice: "INV007",
			paymentStatus: "Unpaid",
			totalAmount: "$300.00",
			paymentMethod: "Credit Card",
		},
	];
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (This named horizontal scroll region must be reachable by keyboard.) -->
<div class="table-region w-full overflow-x-auto rounded-md" role="region" aria-label="Recent invoices" tabindex="0">
<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head scope="col" class="w-[100px]">Invoice</Table.Head>
			<Table.Head scope="col">Status</Table.Head>
			<Table.Head scope="col">Method</Table.Head>
			<Table.Head scope="col" class="text-end tabular-nums">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each invoices as invoice (invoice)}
			<Table.Row>
				<Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
				<Table.Cell>{invoice.paymentStatus}</Table.Cell>
				<Table.Cell>{invoice.paymentMethod}</Table.Cell>
				<Table.Cell class="text-end tabular-nums">{invoice.totalAmount}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={3}>Total</Table.Cell>
			<Table.Cell class="text-end tabular-nums">$2,500.00</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
</div>

<style>
	.table-region :global([data-slot="table-container"]) { overflow: visible; }
</style>
