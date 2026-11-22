<script lang="ts">
 import * as Message from '$lib/registry/ui/message/index.js';
 import * as Bubble from '$lib/registry/ui/bubble/index.js';
 import * as Avatar from '$lib/registry/ui/avatar/index.js';
</script>
<div class="flex w-full max-w-md flex-col gap-6">
 <Message.Root><Message.Avatar><Avatar.Root><Avatar.Fallback>MR</Avatar.Fallback></Avatar.Root></Message.Avatar><Message.Content><Message.Header>Mika · 10:24</Message.Header><Bubble.Root variant="muted"><Bubble.Content>I’ve updated the profile layout. What do you think?</Bubble.Content></Bubble.Root></Message.Content></Message.Root>
 <Message.Root align="end"><Message.Avatar><Avatar.Root><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root></Message.Avatar><Message.Content><Message.Header>Alex · 10:25</Message.Header><Bubble.Root><Bubble.Content>The spacing feels much calmer. Let’s keep this direction.</Bubble.Content></Bubble.Root><Message.Footer>Delivered</Message.Footer></Message.Content></Message.Root>
 <Message.Root><Message.Avatar><Avatar.Root><Avatar.Fallback>MR</Avatar.Fallback></Avatar.Root></Message.Avatar><Message.Content><Bubble.Root variant="muted"><Bubble.Content>Great. I’ll check it in both themes.</Bubble.Content></Bubble.Root></Message.Content></Message.Root>
</div>
