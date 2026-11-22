<script lang="ts">
	import BoldIcon from "$lib/components/registry-icons/bold.svelte";
	import ItalicIcon from "$lib/components/registry-icons/italic.svelte";
	import UnderlineIcon from "$lib/components/registry-icons/underline.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root variant="outline" type="multiple" aria-label="Text formatting">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<BoldIcon />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<ItalicIcon />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="underline" aria-label="Toggle underline">
		<UnderlineIcon />
	</ToggleGroup.Item>
</ToggleGroup.Root>
