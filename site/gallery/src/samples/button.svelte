<script>
 import { Button } from '$lib/registry/ui/button';
 import { Icon } from '$lib/components/icon';
 let message=$state('');
</script>
<div class="w-full max-w-lg space-y-6">
 <div class="flex flex-wrap gap-3"><Button onclick={()=>message='Primary action selected.'}>Save changes</Button><Button variant="secondary" onclick={()=>message='Secondary action selected.'}>Secondary</Button><Button variant="outline" onclick={()=>message='Outline action selected.'}>Outline</Button><Button variant="ghost" onclick={()=>message='Ghost action selected.'}>Ghost</Button></div>
 <div class="flex flex-wrap gap-3"><Button variant="destructive" onclick={()=>message='Destructive variant selected; no data changed.'}><Icon name="delete" size={16}/>Delete draft</Button><Button disabled>Unavailable</Button><Button variant="outline" size="icon" aria-label="Add item" onclick={()=>message='Add action selected.'}><Icon name="add" size={16}/></Button></div>
 <div class="flex flex-wrap gap-3"><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button variant="link" href="#brand">Brand reference</Button></div>
 <p class="text-sm text-muted-foreground">Neutral actions, semantic destructive feedback, and Pacific reserved for the actual link. Use Tab to inspect focus.</p>
 <p role="status" class="text-sm">{message}</p>
</div>
