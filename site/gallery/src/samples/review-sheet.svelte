<script lang="ts">
 import * as Sheet from '$lib/registry/ui/sheet/index.js';
 import { Button, buttonVariants } from '$lib/registry/ui/button/index.js';
 import { Input } from '$lib/registry/ui/input/index.js';
 import { Label } from '$lib/registry/ui/label/index.js';
 let open = $state(false);
 let name = $state('Alex Morgan');
 let username = $state('@alex');
 let saved = $state(false);
 const uid = $props.id();
 function save(event: SubmitEvent) { event.preventDefault(); saved = true; open = false; }
</script>

<div class="grid justify-items-center gap-3">
 <Sheet.Root bind:open>
  <Sheet.Trigger type="button" class={buttonVariants({ variant: 'outline' })}>Edit profile</Sheet.Trigger>
  <Sheet.Content side="right">
   <Sheet.Header>
    <Sheet.Title>Edit profile</Sheet.Title>
    <Sheet.Description>Update your name and username, then save your changes.</Sheet.Description>
   </Sheet.Header>
   <form onsubmit={save} class="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
    <div class="grid gap-6 px-4">
     <div class="grid gap-3"><Label for={`${uid}-name`}>Name</Label><Input id={`${uid}-name`} name="name" autocomplete="name" bind:value={name} required /></div>
     <div class="grid gap-3"><Label for={`${uid}-username`}>Username</Label><Input id={`${uid}-username`} name="username" autocomplete="username" bind:value={username} required /></div>
    </div>
    <Sheet.Footer class="mt-auto">
     <Button type="submit">Save changes</Button>
     <Sheet.Close type="button" class={buttonVariants({ variant: 'outline' })}>Cancel</Sheet.Close>
    </Sheet.Footer>
   </form>
  </Sheet.Content>
 </Sheet.Root>
 <p class="text-sm text-muted-foreground" role="status">{saved ? 'Profile saved in this preview.' : ''}</p>
</div>
