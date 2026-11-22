<script lang="ts">
 import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
 import { Scrollbar } from '$lib/registry/ui/scroll-area/index.js';
 import { Separator } from '$lib/registry/ui/separator/index.js';
 const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);
 const uid = $props.id();
</script>

<ScrollAreaPrimitive.Root data-slot="scroll-area" type="auto" class="cn-scroll-area relative h-72 w-48 rounded-md border">
 <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" class="cn-scroll-area-viewport size-full rounded-[inherit] outline-none" tabindex="0" role="region" aria-labelledby={`${uid}-tags`}>
  <div class="p-4">
   <h4 id={`${uid}-tags`} class="mb-4 text-sm leading-none font-medium">Release tags</h4>
   {#each tags as tag, i (tag)}
    <div class="text-sm">{tag}</div>
    {#if i < tags.length - 1}<Separator class="my-2" />{/if}
   {/each}
  </div>
 </ScrollAreaPrimitive.Viewport>
 <Scrollbar orientation="vertical" />
 <ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
