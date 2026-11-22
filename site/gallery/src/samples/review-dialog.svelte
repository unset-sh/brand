<script lang="ts">
 import * as Dialog from '$lib/registry/ui/dialog/index.js';
 import * as Field from '$lib/registry/ui/field/index.js';
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
 <Dialog.Root bind:open>
  <Dialog.Trigger type="button" class={buttonVariants({ variant: 'outline' })}>Edit profile</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-sm">
   <Dialog.Header>
    <Dialog.Title>Edit profile</Dialog.Title>
    <Dialog.Description>Update your name and username, then save your changes.</Dialog.Description>
   </Dialog.Header>
   <form onsubmit={save} class="grid gap-6">
    <Field.Group>
     <Field.Field><Label for={`${uid}-name`}>Name</Label><Input id={`${uid}-name`} name="name" autocomplete="name" bind:value={name} required /></Field.Field>
     <Field.Field><Label for={`${uid}-username`}>Username</Label><Input id={`${uid}-username`} name="username" autocomplete="username" bind:value={username} required /></Field.Field>
    </Field.Group>
    <Dialog.Footer>
     <Dialog.Close type="button" class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
     <Button type="submit">Save changes</Button>
    </Dialog.Footer>
   </form>
  </Dialog.Content>
 </Dialog.Root>
 <p class="text-sm text-muted-foreground" role="status">{saved ? 'Profile saved in this preview.' : ''}</p>
</div>
