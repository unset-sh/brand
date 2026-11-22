<script lang="ts">
	import CheckIcon from "$lib/components/registry-icons/check.svelte";
	import ClockIcon from "$lib/components/registry-icons/clock.svelte";
	import FileTextIcon from "$lib/components/registry-icons/file-text.svelte";
	import FileWarningIcon from "$lib/components/registry-icons/file-warning.svelte";
	import RefreshCwIcon from "$lib/components/registry-icons/refresh-cw.svelte";
	import XIcon from "$lib/components/registry-icons/x.svelte";
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
	<Attachment.Root state="idle" class="w-full">
		<Attachment.Media>
			<ClockIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>selected-file.pdf</Attachment.Title>
			<Attachment.Description>Ready to upload</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove selected-file.pdf">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="uploading" class="w-full">
		<Attachment.Media>
			<Spinner />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>design-system.zip</Attachment.Title>
			<Attachment.Description>Uploading · 64%</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Cancel upload">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="processing" class="w-full">
		<Attachment.Media>
			<FileTextIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>market-research.pdf</Attachment.Title>
			<Attachment.Description>Processing document</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove market-research.pdf">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="error" class="w-full">
		<Attachment.Media>
			<FileWarningIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>financial-model.xlsx</Attachment.Title>
			<Attachment.Description>Upload failed. Try again.</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Retry upload">
				<RefreshCwIcon />
			</Attachment.Action>
			<Attachment.Action aria-label="Remove financial-model.xlsx">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="done" class="w-full">
		<Attachment.Media>
			<CheckIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>uploaded-report.pdf</Attachment.Title>
			<Attachment.Description>Uploaded · 1.8 MB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove uploaded-report.pdf">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
</div>
