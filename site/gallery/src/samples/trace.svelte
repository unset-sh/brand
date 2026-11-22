<script lang="ts">
 import * as Trace from '$lib/registry/ui/trace/index.js';
 import { Icon } from '$lib/components/icon';
</script>
<div class="w-full max-w-lg">
 <Trace.Root>
  <Trace.Collapsible open><Trace.CollapsibleTrigger class="min-h-10 w-full justify-between gap-2"><Trace.Line><Trace.Icon><Icon name="done"/></Trace.Icon><Trace.Title class="overflow-visible whitespace-normal">Checked shared tokens</Trace.Title></Trace.Line></Trace.CollapsibleTrigger><Trace.CollapsibleContent><p>Page, card and popover roles use the same Graphite foundation in both themes.</p></Trace.CollapsibleContent></Trace.Collapsible>
  <Trace.Collapsible><Trace.CollapsibleTrigger class="min-h-10 w-full justify-between gap-2"><Trace.Line status="error"><Trace.Icon><Icon name="close"/></Trace.Icon><Trace.Title class="overflow-visible whitespace-normal">Found an unmapped colour</Trace.Title></Trace.Line></Trace.CollapsibleTrigger><Trace.CollapsibleContent><p>Example diagnostic: a component contains a literal colour. Replace it with its semantic role before adoption.</p></Trace.CollapsibleContent></Trace.Collapsible>
  <Trace.Line status="pending" class="min-h-10 data-[status=pending]:opacity-100"><Trace.Icon><Icon name="warning"/></Trace.Icon><Trace.Title class="overflow-visible whitespace-normal">Waiting for review</Trace.Title></Trace.Line>
 </Trace.Root>
 <p class="mt-4 text-sm text-muted-foreground">Example trace states. These are sample messages, not live audit results.</p>
</div>
