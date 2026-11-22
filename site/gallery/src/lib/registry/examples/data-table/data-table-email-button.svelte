<script lang="ts">
	import ArrowUpDownIcon from "$lib/components/registry-icons/arrow-up-down.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { ComponentProps } from "svelte";

	let { variant = "ghost", ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
	Email
	<ArrowUpDownIcon />
</Button>
