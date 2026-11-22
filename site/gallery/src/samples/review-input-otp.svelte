<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";

	let value = $state("123456");
</script>

<div class="grid gap-3">
	<Label for="verification-code">Verification code</Label>
<InputOTP.Root inputId="verification-code" aria-describedby="verification-code-hint" maxlength={6} bind:value>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
	<p id="verification-code-hint" class="text-sm text-muted-foreground">Enter or paste the 6-digit code.</p>
</div>
