<script lang="ts">
 import { onMount } from 'svelte';
 import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
 import { Icon } from '$lib/components/icon';
 import { Button } from '$lib/registry/ui/button/index.js';
 let active=$state('Profile');
 let query=$state('');
 let responsive=$state(true);
 let container: HTMLDivElement | undefined=$state();
 let open=$state(true);
 let compact=$state(false);
 const pages=[{name:'Profile',icon:'profile'},{name:'Appearance',icon:'settings'},{name:'Notifications',icon:'notifications'}] as const;
 onMount(()=>{
  if(!container) return;
  let initialized=false;
  const fit=(width:number)=>{
   const next=width<480;
   if(!initialized || next!==compact){compact=next;open=!next;initialized=true;}
  };
  fit(container.getBoundingClientRect().width);
  const observer=new ResizeObserver(([entry])=>fit(entry.contentRect.width));
  observer.observe(container);
  return ()=>observer.disconnect();
 });
</script>
<div class="w-full space-y-3">
 <Button variant="outline" size="sm" onclick={()=>responsive=!responsive}>{responsive?'Show embedded sidebar':'Test responsive sidebar'}</Button>
 <div bind:this={container} data-compact={compact && responsive} class="sidebar-demo relative w-full overflow-hidden rounded-lg border">
 <Sidebar.Provider bind:open class="min-h-0! h-96!" style="--sidebar-width: 13rem; --sidebar-width-icon: 3.5rem;">
  <Sidebar.Root collapsible={responsive?'icon':'none'} class="border-r">
   <Sidebar.Header><div class="flex items-center justify-between group-data-[collapsible=icon]:hidden"><p class="px-2 py-1 font-semibold">unset.sh</p>{#if responsive}<Sidebar.Trigger class={compact?'':'md:hidden'} aria-label="Close sidebar" />{/if}</div><Sidebar.Input class="group-data-[collapsible=icon]:hidden" aria-label="Find settings" placeholder="Find settings…" bind:value={query}/></Sidebar.Header>
   <Sidebar.Content><Sidebar.Group><Sidebar.GroupLabel>Your account</Sidebar.GroupLabel><Sidebar.GroupContent><Sidebar.Menu>
    {#each pages.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())) as page}<Sidebar.MenuItem><Sidebar.MenuButton isActive={active===page.name} aria-current={active===page.name ? "page" : undefined} tooltipContent={page.name} onclick={()=>active=page.name}><Icon name={page.icon}/><span>{page.name}</span></Sidebar.MenuButton>{#if page.name==='Notifications'}<Sidebar.MenuBadge>3</Sidebar.MenuBadge>{/if}</Sidebar.MenuItem>{/each}
    {#if !pages.some(p=>p.name.toLowerCase().includes(query.toLowerCase()))}<p class="px-2 py-3 text-sm text-muted-foreground">No matching sections.</p>{/if}<Sidebar.MenuItem><Sidebar.MenuButton disabled tooltipContent="Team settings"><Icon name="private"/><span>Team settings</span></Sidebar.MenuButton></Sidebar.MenuItem>
   </Sidebar.Menu></Sidebar.GroupContent></Sidebar.Group></Sidebar.Content>
   <Sidebar.Separator/><Sidebar.Footer><Sidebar.Menu><Sidebar.MenuItem><Sidebar.MenuButton isActive={active==='Help'} aria-current={active==='Help' ? "page" : undefined} tooltipContent="Help and support" onclick={()=>active='Help'}><Icon name="help"/><span>Help and support</span></Sidebar.MenuButton></Sidebar.MenuItem></Sidebar.Menu></Sidebar.Footer>
  </Sidebar.Root>
  <section aria-label="Sidebar content" class="min-w-0 flex-1 overflow-y-auto p-5">{#if responsive}<Sidebar.Trigger class="mb-3"/>{/if}<h3 class="text-lg font-semibold">{active}</h3><p class="mt-3 text-sm text-muted-foreground">The selected section stays neutral. Sidebar colours are separate aliases of the same shared palette.</p><p class="mt-4 text-xs text-muted-foreground">{responsive?'Use the menu button: it collapses to icons on wide screens and opens a sheet on narrow screens.':'Embedded static-width variant. Active, hover and disabled menu states are available here.'}</p></section>
 </Sidebar.Provider>
 </div>
</div>
<style>
 .sidebar-demo :global([data-slot="sidebar-container"]) { position:absolute !important; height:100% !important; }
 .sidebar-demo[data-compact="true"] :global([data-slot="sidebar-gap"]) { width:var(--sidebar-width-icon) !important; }
</style>
