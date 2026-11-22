<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	let value = $state(50);
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
	<div class="flex items-center justify-between gap-4">
		<span id="review-progress-label" class="font-medium">Example upload</span>
		<output class="tabular-nums" aria-live="polite">{value}%</output>
	</div>
	<Progress {value} aria-labelledby="review-progress-label" />
	<div class="flex flex-wrap gap-3">
		<Button variant="outline" disabled={value === 0} onclick={() => value = Math.max(0, value - 10)} aria-label="Decrease example upload progress by 10 percent">−10%</Button>
		<Button variant="outline" disabled={value === 100} onclick={() => value = Math.min(100, value + 10)} aria-label="Increase example upload progress by 10 percent">+10%</Button>
	</div>
	<p class="text-sm text-muted-foreground">Adjust the progress to preview its states. No file is uploading.</p>
</div>
