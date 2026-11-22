<script lang="ts">
 import * as AlertDialog from '$lib/registry/ui/alert-dialog/index.js';
 import { buttonVariants } from '$lib/registry/ui/button/index.js';
 let removed = $state(false);
</script>

<div class="grid justify-items-center gap-3">
 <AlertDialog.Root>
  <AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>Delete draft…</AlertDialog.Trigger>
  <AlertDialog.Content>
   <AlertDialog.Header>
    <AlertDialog.Title>Delete this draft?</AlertDialog.Title>
    <AlertDialog.Description>This removes the draft from this preview. The action cannot be undone.</AlertDialog.Description>
   </AlertDialog.Header>
   <AlertDialog.Footer>
    <AlertDialog.Cancel>Keep draft</AlertDialog.Cancel>
    <AlertDialog.Action variant="destructive" onclick={() => removed = true}>Delete draft</AlertDialog.Action>
   </AlertDialog.Footer>
  </AlertDialog.Content>
 </AlertDialog.Root>
 <p role="status" class="text-sm text-muted-foreground">{removed ? 'Draft removed in this preview.' : ''}</p>
</div>
