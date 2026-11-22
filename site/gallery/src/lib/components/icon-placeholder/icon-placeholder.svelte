<script lang="ts">
 import { Icon, type IconName } from '../icon';
 import fallback from '$brand-icons/icon-map.json';
 import tablerMap from '$brand-icons/tabler-map.json';
 let {tabler='',lucide='InfoIcon',hugeicons,phosphor,remixicon,class:className='',role,'aria-label':ariaLabel,'aria-hidden':ariaHidden,...restProps}=$props();
 const key=$derived(lucide.replace(/Icon$/, '').replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase());
 const icon=$derived(tabler ? tablerMap[tabler as keyof typeof tablerMap] : fallback[key as keyof typeof fallback]);
 const name=$derived(`tabler:${icon}` as IconName);
</script>
<Icon {...restProps} {name} size={16} class={className}/>
{#if ariaLabel && ariaHidden!==true && ariaHidden!=='true'}
 <span class="sr-only" role={role==='status'?'status':undefined}>{ariaLabel}</span>
{/if}
