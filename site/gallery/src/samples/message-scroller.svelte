<script lang="ts">
 import * as MessageScroller from '$lib/registry/ui/message-scroller/index.js';
 import * as Message from '$lib/registry/ui/message/index.js';
 import * as Bubble from '$lib/registry/ui/bubble/index.js';
 import { Button } from '$lib/registry/ui/button/index.js';
 let messages=$state(['Welcome to the Unset component gallery.','The same theme supports the app, docs and renderer.','Pacific is reserved for unvisited links.','Lavender shows a link you have visited.','Controls and focus remain neutral.','Success, warning and error carry clear labels.']);
 function append(){messages=[...messages,`Local example message ${messages.length+1}. Scroll up to read earlier messages, then use the jump-to-latest control.`];}
</script>
<MessageScroller.Provider autoScroll>
 <div class="flex w-full max-w-lg flex-col gap-3">
  <div class="h-80 overflow-hidden rounded-lg border bg-card">
   <MessageScroller.Root><MessageScroller.Viewport><MessageScroller.Content class="space-y-5 p-4" aria-label="Local example conversation">
    {#each messages as message,index (index)}<MessageScroller.Item><Message.Root align={index%2===0?'start':'end'}><Message.Content><Bubble.Root variant={index%2===0?'muted':'default'}><Bubble.Content>{message}</Bubble.Content></Bubble.Root><Message.Footer>Example message {index+1}</Message.Footer></Message.Content></Message.Root></MessageScroller.Item>{/each}
   </MessageScroller.Content></MessageScroller.Viewport><MessageScroller.Button/></MessageScroller.Root>
  </div>
  <Button variant="outline" onclick={append}>Add local message</Button>
  <p class="text-sm text-muted-foreground">A real scroll container with local example messages. Nothing is sent.</p>
 </div>
</MessageScroller.Provider>
