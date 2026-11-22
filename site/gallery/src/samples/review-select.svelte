<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];

	let value = $state("");
</script>

<div class="grid w-full max-w-xs gap-2">
	<Label for="favourite-fruit">Favourite fruit</Label>
<Select.Root type="single" name="favoriteFruit" items={fruits} bind:value>
	<Select.Trigger id="favourite-fruit" class="w-full">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{#each fruits as fruit (fruit.value)}
				<Select.Item value={fruit.value} label={fruit.label}>
					{fruit.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
</div>
