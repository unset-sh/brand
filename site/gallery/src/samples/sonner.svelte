<script lang="ts">
 import { onMount } from 'svelte';
 import { toast } from 'svelte-sonner';
 import { Toaster } from '$lib/registry/ui/sonner/index.js';
 import { Button } from '$lib/registry/ui/button/index.js';
 import { Icon } from '$lib/components/icon';
 let theme = $state<'light'|'dark'>('dark');
 onMount(()=>{const sync=()=>theme=document.documentElement.dataset.theme==='light'?'light':'dark';sync();const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});return()=>observer.disconnect();});
 const toastStyle='--normal-bg:var(--popover);--normal-text:var(--popover-foreground);--normal-border:var(--border);--success-bg:var(--success-surface);--success-text:var(--success);--success-border:var(--success);--warning-bg:var(--warning-surface);--warning-text:var(--warning);--warning-border:var(--warning);--error-bg:var(--danger-surface);--error-text:var(--danger);--error-border:var(--danger);--info-bg:var(--popover);--info-text:var(--popover-foreground);--info-border:var(--border);font-family:var(--font-sans)';
</script>
<Toaster {theme} richColors closeButton position="bottom-right" style={toastStyle}>
 {#snippet closeIcon()}<Icon name="close" size={16}/>{/snippet}
</Toaster>
<div class="flex max-w-xl flex-wrap gap-3">
 <Button variant="outline" onclick={()=>toast.success('Profile saved',{description:'Your changes are now visible.',duration:10000})}>Success toast</Button>
 <Button variant="outline" onclick={()=>toast.warning('Changes not published',{description:'Save before leaving this page.',duration:10000})}>Warning toast</Button>
 <Button variant="outline" onclick={()=>toast.error('Couldn’t save changes',{description:'Your draft is still here. Check your connection and try again.',duration:10000})}>Error toast</Button>
 <Button variant="outline" onclick={()=>toast.info('Your profile is public',{description:'Only add information you want to share.',duration:10000})}>Information toast</Button>
</div>
