<script>import * as Alert from '$lib/registry/ui/alert';import { Icon } from '$lib/components/icon';</script>
<div class="w-full max-w-lg space-y-4">
 <Alert.Root data-tone="success" role="status"><Icon name="done"/><Alert.Title>Profile published</Alert.Title><Alert.Description>Your changes are now visible.</Alert.Description></Alert.Root>
 <Alert.Root data-tone="warning" role="status"><Icon name="warning"/><Alert.Title>Changes not published</Alert.Title><Alert.Description>Save when you’re ready to share them.</Alert.Description></Alert.Root>
 <Alert.Root data-tone="danger" variant="destructive"><Icon name="close"/><Alert.Title>Couldn’t save changes</Alert.Title><Alert.Description>Check the highlighted field and try again.</Alert.Description></Alert.Root>
 <Alert.Root data-tone="info" role="note"><Icon name="info"/><Alert.Title>Your profile is public</Alert.Title><Alert.Description>Only add information you want to share.</Alert.Description></Alert.Root>
</div>
