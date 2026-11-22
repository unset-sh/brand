<script lang="ts">
	import CalendarIcon from "$lib/components/registry-icons/calendar.svelte";
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value = $state<DateValue | undefined>();
</script>

<Field.Field class="mx-auto w-full max-w-xs">
	<Field.Label for="date-picker-simple">Date</Field.Label>
	<Popover.Root>
		<Popover.Trigger id="date-picker-simple">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="justify-between font-normal">
					<span>{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}</span>
					<CalendarIcon class="size-4 shrink-0 text-muted-foreground" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" align="start">
			<Calendar type="single" bind:value />
		</Popover.Content>
	</Popover.Root>
</Field.Field>
