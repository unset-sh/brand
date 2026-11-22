<!-- Tabler Icons 3.52.0, copied from the pinned official node data. See TABLER-LICENSE.md. -->
<script lang="ts" module>
 import data from '$brand-icons/icons.json';
 export type IconName = keyof typeof data.aliases | `tabler:${keyof typeof data.drawings}`;
</script>
<script lang="ts">
 import type { SVGAttributes } from 'svelte/elements';
 let { name, size=20, label, class:className, ...restProps }: Omit<SVGAttributes<SVGSVGElement>, 'name'|'class'> & {
  name: IconName; size?:16|20|24; label?:string; class?:string;
 } = $props();
 const iconName = $derived(name.startsWith('tabler:') ? name.slice(7) : data.aliases[name as keyof typeof data.aliases]);
 const nodes = $derived(data.drawings[iconName as keyof typeof data.drawings]);
 const filled = $derived(iconName.endsWith('-filled'));
</script>
<svg {...restProps} class={className} width={size} height={size} viewBox="0 0 24 24"
 fill={filled?'currentColor':'none'} stroke={filled?'none':'currentColor'}
 stroke-width={filled?0:2} stroke-linecap="round" stroke-linejoin="round"
 data-icon-family="tabler" data-icon={iconName} aria-hidden="true" focusable="false">
 {#each nodes as node,index (index)}<path {...node[1]}/>{/each}
</svg>
{#if label!==undefined}<span class="sr-only">{label}</span>{/if}
