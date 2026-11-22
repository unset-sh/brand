<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";

	let value = $state([30, 70]);
	const minimum = 0;
	const maximum = 100;
</script>

<!-- The stock slider wrapper owns the thumb snippet. This composition keeps its
     primitive and class contract so each thumb can have its own visible label. -->
<fieldset class="grid w-full max-w-xs gap-3">
	<legend id="range-label" class="mb-3 text-sm font-medium">Range</legend>
	<div class="flex items-center justify-between gap-4 text-sm">
		<span><span id="range-lower-label">Lower value</span> <strong class="tabular-nums">{value[0]}</strong></span>
		<span><span id="range-upper-label">Upper value</span> <strong class="tabular-nums">{value[1]}</strong></span>
	</div>
	<SliderPrimitive.Root
		type="multiple"
		bind:value
		min={minimum}
		max={maximum}
		step={5}
		orientation="horizontal"
		data-slot="slider"
		class="cn-slider relative flex w-full touch-none items-center select-none data-disabled:opacity-50"
	>
		{#snippet children({ thumbItems })}
			<span data-slot="slider-track" data-orientation="horizontal" class="cn-slider-track relative w-full grow overflow-hidden">
				<SliderPrimitive.Range data-slot="slider-range" class="cn-slider-range absolute h-full select-none" />
			</span>
			{#each thumbItems as thumb (thumb.index)}
				<SliderPrimitive.Thumb
					index={thumb.index}
					data-slot="slider-thumb"
					aria-labelledby={`range-label range-${thumb.index === 0 ? "lower" : "upper"}-label`}
					aria-describedby="range-hint"
					class="cn-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
				/>
			{/each}
		{/snippet}
	</SliderPrimitive.Root>
	<div class="flex justify-between text-sm text-muted-foreground"><span>Min {minimum}</span><span>Max {maximum}</span></div>
	<p id="range-hint" class="text-sm text-muted-foreground">Use the arrow keys to adjust each value.</p>
</fieldset>
