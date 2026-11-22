<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
 let open = $state(false);
</script>

<HoverCard.Root bind:open openDelay={400} closeDelay={150}>
	<HoverCard.Trigger class={buttonVariants({ variant: "outline" })}>
  {#snippet child({ props })}
   <button {...props} type="button" onclick={() => open = !open}>Preview Svelte profile</button>
  {/snippet}
 </HoverCard.Trigger>
	<HoverCard.Content class="flex w-64 flex-col gap-0.5">
		<div class="font-semibold">@sveltejs</div>
		<div>A framework for building user interfaces with HTML, CSS and JavaScript.</div>
		<div class="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
	</HoverCard.Content>
</HoverCard.Root>
