<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
	<Item.Root variant="muted">
		<Item.Media aria-hidden="true"><Spinner /></Item.Media>
		<Item.Content>
			<Item.Title class="whitespace-normal">Processing payment…</Item.Title>
		</Item.Content>
		<Item.Content class="flex-none justify-end">
			<span class="text-sm tabular-nums">$100.00</span>
		</Item.Content>
	</Item.Root>
	<p class="text-sm text-muted-foreground">Loading appearance only. No payment is being processed.</p>
</div>
