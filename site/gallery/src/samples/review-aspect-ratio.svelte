<script lang="ts">
 import mark from '$brand-logo/unset-mark-white.svg';
	import { AspectRatio } from "$lib/registry/ui/aspect-ratio/index.js";
</script>

<div class="w-full max-w-sm">
	<AspectRatio ratio={16 / 9}>
		<div class="size-full rounded-lg bg-background">
			<img src={mark} alt="Unset brand mark" class="brand-mark size-full object-contain p-8" />
		</div>
	</AspectRatio>
</div>

<style>
	:global([data-theme="light"]) .brand-mark { filter: invert(1); }
</style>
