<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	let feedback = $state("");
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Log in to your account</Card.Title>
		<Card.Description>Try this example form. No details are sent.</Card.Description>
		<Card.Action>
			<Button type="button" variant="ghost" onclick={() => feedback = "This is a local sign-up preview."}>Sign up</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<form id="review-login" onsubmit={(event) => { event.preventDefault(); feedback = "Form complete. This preview does not sign you in."; }}>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="review-email">Email</Label>
					<Input id="review-email" name="email" type="email" autocomplete="username" placeholder="you@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="review-password">Password</Label>
					<Input id="review-password" name="password" type="password" autocomplete="current-password" required />
					<Button type="button" variant="ghost" class="justify-self-end" onclick={() => feedback = "Account recovery would open here in the application."}>Forgot your password?</Button>
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-3">
		<Button type="submit" form="review-login" class="w-full">Log in</Button>
		<Button type="button" variant="outline" class="w-full" onclick={() => feedback = "This preview does not connect to Google."}>Log in with Google</Button>
		<p role="status" class="text-sm text-muted-foreground">{feedback}</p>
	</Card.Footer>
</Card.Root>
