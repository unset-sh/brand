<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field>
	<Field.Label for="input-field-username">Username</Field.Label>
	<Input id="input-field-username" aria-describedby="input-username-hint" type="text" placeholder="Enter your username" />
	<Field.Description id="input-username-hint">Choose a unique username for your account.</Field.Description>
</Field.Field>
