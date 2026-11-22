<script lang="ts">
	import Archive from "$lib/components/registry-icons/archive.svelte";
	import ArrowLeft from "$lib/components/registry-icons/arrow-left.svelte";
	import CalendarPlus from "$lib/components/registry-icons/calendar-plus.svelte";
	import Clock from "$lib/components/registry-icons/clock.svelte";
	import ListFilter from "$lib/components/registry-icons/list-filter.svelte";
	import MailCheck from "$lib/components/registry-icons/mail-check.svelte";
	import MoreHorizontal from "$lib/components/registry-icons/more-horizontal.svelte";
	import Tag from "$lib/components/registry-icons/tag.svelte";
	import Trash2 from "$lib/components/registry-icons/trash-2.svelte";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let label = $state("personal");
</script>

<div class="flex max-w-full flex-wrap items-center gap-2" role="group" aria-label="Message actions">
	<ButtonGroup.Root class="hidden sm:flex">
		<Button variant="outline" size="icon" aria-label="Go Back">
			<ArrowLeft />
		</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline">Archive</Button>
		<Button variant="outline">Report</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline">Snooze</Button>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="icon" aria-label="More Options">
						<MoreHorizontal />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" class="w-40">
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<MailCheck />
						Mark as Read
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Archive />
						Archive
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<Clock />
						Snooze
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CalendarPlus />
						Add to Calendar
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<ListFilter />
						Add to List
					</DropdownMenu.Item>
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>
							<Tag />
							Label As...
						</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.RadioGroup bind:value={label}>
								<DropdownMenu.RadioItem value="personal">Personal</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="work">Work</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="other">Other</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item variant="destructive">
						<Trash2 />
						Trash
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</ButtonGroup.Root>
</div>
