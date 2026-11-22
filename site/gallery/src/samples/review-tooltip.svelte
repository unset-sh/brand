<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={buttonVariants({ variant: "outline" })}>Save item</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add this item to your library</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
