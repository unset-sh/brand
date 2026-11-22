<script lang="ts">
 import * as Resizable from '$lib/registry/ui/resizable/index.js';
 import { Button } from '$lib/registry/ui/button/index.js';
 import { Icon } from '$lib/components/icon';
 type PaneControls = { resize: (size: number) => void; getSize: () => number };
 let firstPane: PaneControls | undefined = $state();
 let topPane: PaneControls | undefined = $state();
 let width = $state(50);
 let height = $state(35);
 function resize(pane: PaneControls | undefined, delta: number) {
  if (pane) pane.resize(Math.max(20, Math.min(80, pane.getSize() + delta)));
 }
</script>

<div class="w-full max-w-sm space-y-4">
 <Resizable.PaneGroup direction="horizontal" class="h-[220px]! rounded-lg border">
  <Resizable.Pane bind:this={firstPane} defaultSize={50} minSize={20} onResize={(size) => width = Math.round(size)}>
   <div class="flex h-full items-center justify-center p-3"><span class="font-semibold">One</span></div>
  </Resizable.Pane>
  <Resizable.Handle withHandle aria-label="Resize left and right panes" />
  <Resizable.Pane defaultSize={50} minSize={20}>
   <Resizable.PaneGroup direction="vertical">
    <Resizable.Pane bind:this={topPane} defaultSize={35} minSize={20} onResize={(size) => height = Math.round(size)}>
     <div class="flex h-full items-center justify-center p-3"><span class="font-semibold">Two</span></div>
    </Resizable.Pane>
    <Resizable.Handle withHandle aria-label="Resize upper and lower panes" />
    <Resizable.Pane defaultSize={65} minSize={20}>
     <div class="flex h-full items-center justify-center p-3"><span class="font-semibold">Three</span></div>
    </Resizable.Pane>
   </Resizable.PaneGroup>
  </Resizable.Pane>
 </Resizable.PaneGroup>
 <div class="grid gap-3 text-sm">
  <div class="flex flex-wrap items-center gap-2"><span class="mr-auto text-muted-foreground">Left pane · {width}%</span><Button variant="outline" size="icon-sm" aria-label="Narrow left pane" disabled={width <= 20} onclick={() => resize(firstPane, -10)}><Icon name="remove" /></Button><Button variant="outline" size="icon-sm" aria-label="Widen left pane" disabled={width >= 80} onclick={() => resize(firstPane, 10)}><Icon name="add" /></Button></div>
  <div class="flex flex-wrap items-center gap-2"><span class="mr-auto text-muted-foreground">Upper pane · {height}%</span><Button variant="outline" size="icon-sm" aria-label="Shorten upper pane" disabled={height <= 20} onclick={() => resize(topPane, -10)}><Icon name="remove" /></Button><Button variant="outline" size="icon-sm" aria-label="Taller upper pane" disabled={height >= 80} onclick={() => resize(topPane, 10)}><Icon name="add" /></Button></div>
 </div>
 <p class="text-sm text-muted-foreground">Drag a divider, focus it and use arrow keys, or use the size controls.</p>
</div>
