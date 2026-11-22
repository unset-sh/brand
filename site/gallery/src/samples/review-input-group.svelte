<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import SearchIcon from "$lib/components/registry-icons/search.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
</script>

<div class="grid w-full max-w-xs gap-2">
	<Label for="example-component-search">Search components</Label>
<InputGroup.Root>
	<InputGroup.Input id="example-component-search" type="search" aria-describedby="example-component-search-count" placeholder="Search components..." />
	<InputGroup.Addon>
		<SearchIcon />
	</InputGroup.Addon>
	<InputGroup.Addon id="example-component-search-count" align="inline-end">12 results</InputGroup.Addon>
</InputGroup.Root>
</div>
