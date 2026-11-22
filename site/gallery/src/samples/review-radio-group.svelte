<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<fieldset class="grid gap-3">
	<legend id="density-label" class="mb-3 text-sm font-medium">Interface density</legend>
<RadioGroup.Root value="comfortable" aria-labelledby="density-label" class="w-fit">
	<div class="flex items-center gap-3">
		<RadioGroup.Item value="default" id="r1" />
		<Label for="r1">Default</Label>
	</div>
	<div class="flex items-center gap-3">
		<RadioGroup.Item value="comfortable" id="r2" />
		<Label for="r2">Comfortable</Label>
	</div>
	<div class="flex items-center gap-3">
		<RadioGroup.Item value="compact" id="r3" />
		<Label for="r3">Compact</Label>
	</div>
</RadioGroup.Root>
</fieldset>
