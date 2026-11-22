<script lang="ts">
 import { onMount } from 'svelte';
 import { catalog } from './catalog.js';
 import brandMeta from '$brand-dist/meta.json';
 import mark from '$brand-logo/unset-mark-white.svg';
 const guideHref = import.meta.env.BASE_URL.replace(/components\/$/, '');
 import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
 import { Icon } from '$lib/components/icon';
 function savedTheme() {try {return localStorage.getItem('unset-brand-theme')==='light'?'light':'dark';} catch {return 'dark';}}
 let theme=$state(savedTheme());
 let radius=$state('default');
 let query=$state('');
 const initialComponent=new URLSearchParams(location.search).get('component');
 let selected=$state(catalog.some(component=>component.id===initialComponent)?initialComponent!:'button');
 let notification=$state('');
 let showContract=$state(false);
 let contentWidth=$state('fluid');
 const current=$derived(catalog.find(c=>c.id===selected)||catalog[0]);
 const filtered=$derived(catalog.filter(c=>c.name.toLowerCase().includes(query.toLowerCase())));
 const index=$derived(catalog.findIndex(c=>c.id===selected));
 const sample=$derived(current.load());
 const provisional=$derived(['chart','code-block','sonner','typography'].includes(selected));
 $effect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('unset-brand-theme',theme);}catch{}document.documentElement.classList.toggle('dark',theme==='dark');if(radius==='default')document.documentElement.style.removeProperty('--radius');else document.documentElement.style.setProperty('--radius',radius+'px');});
 $effect(()=>{history.replaceState(null,'','?component='+current.id);});
 function step(direction:number){selected=catalog[(index+direction+catalog.length)%catalog.length].id;}
 function localNavigation(e:MouseEvent){const a=(e.target as Element).closest('a');if(a){e.preventDefault();notification='Navigation example: '+a.textContent?.trim()+'. No page was changed.';}}
 onMount(()=>{const prevent=(e:Event)=>{e.preventDefault();notification='Form submitted locally for this example.';};document.addEventListener('submit',prevent,true);return()=>document.removeEventListener('submit',prevent,true);});
</script>

<Tooltip.Provider>
<div class="library">
 <header class="library-header"><div class="brand"><img src={mark} alt=""/><strong>unset.sh</strong><span></span><p>Design system</p></div><a class="guide-backlink" href={guideHref}><Icon name="back" size={16}/>Brand guide</a></header>
 <div class="library-intro"><div><p class="eyebrow">BUILT TO GROW WITH UNSET</p><h1>One language.<br><span>Every component.</span></h1></div><p class="intro-note">All <strong>66</strong> entries from the shadcn-svelte component catalogue, using a shared theme and real component examples.</p></div>
 <div class="library-controls">
  <label>Appearance<select aria-label="Appearance" bind:value={theme}><option value="dark">Dark</option><option value="light">Light</option></select></label>
  <label>Corner radius<select aria-label="Corner radius" bind:value={radius}><option value="default">Contract default</option><option value="4">4 px</option><option value="8">8 px</option><option value="12">12 px</option></select></label>
  <label>Example width<select aria-label="Example width" bind:value={contentWidth}><option value="fluid">Available space</option><option value="compact">320 px</option></select></label>
  <button class="contract-button" aria-expanded={showContract} onclick={()=>showContract=!showContract}><Icon name="list" size={16}/>{showContract?'Hide theme coverage':'Theme coverage'}</button>
 </div>
 {#if showContract}<section class="contract-panel"><h2>What travels with the theme</h2><div class="contract-grid"><p><strong>31 colour roles</strong><span>Core surfaces, controls, all sidebar aliases and five chart slots.</span></p><p><strong>Explicit extensions</strong><span>Pacific / visited lavender links; success, warning, error and neutral info; code and overlays.</span></p><p><strong>Shared component rules</strong><span>Focus, control height, typography, radius and reduced motion. Variables don’t replace interaction testing.</span></p></div><p class="footnote">Chart choices remain provisional. Code Block demonstrates the selected Moss &amp; clay theme and semantic diff lines. The separate AI Elements catalogue is outside these 66 components.</p></section>{/if}
 <div class="library-body">
  <aside class="catalog-sidebar" aria-label="Component catalogue">
   <label class="search-label" for="component-search">Find a component <span>{filtered.length} / 66</span></label>
   <input id="component-search" type="search" bind:value={query} placeholder="Search components…"/>
   <div class="catalog-buttons">
    {#each filtered as c}<button class:current={selected===c.id} aria-pressed={selected===c.id} onclick={()=>selected=c.id}>{c.name}{#if selected===c.id}<Icon name="next" size={16}/>{/if}</button>{/each}
    {#if !filtered.length}<p class="footnote">No matching components.</p>{/if}
   </div>
  </aside>
  <main>
   <div class="mobile-picker"><label for="component-picker">Component</label><select id="component-picker" aria-label="Component" bind:value={selected}>{#each catalog as c}<option value={c.id}>{c.name}</option>{/each}</select></div>
   <div class="example-heading"><div><p class="eyebrow">{String(index+1).padStart(2,'0')} / 66</p><h2>{current.name}</h2></div><div class="step-controls"><button aria-label="Previous component" onclick={()=>step(-1)}><Icon name="back"/></button><button aria-label="Next component" onclick={()=>step(1)}><Icon name="next"/></button></div></div>
   <div class="example-meta"><span>LIVE COMPONENT</span><a href={'https://www.shadcn-svelte.com/docs/components/'+current.id} target="_blank" rel="noreferrer">Official documentation <Icon name="external" size={16}/></a></div>
   <div class="specimen-wrap" class:compact={contentWidth==='compact'}>
    <div class="specimen" data-component={current.id} onclick={localNavigation} role="presentation">
     {#key selected}<svelte:boundary>
      {#await sample}<p class="load-note" role="status">Loading {current.name}…</p>
      {:then module}<module.default/>
      {:catch error}<p class="sample-error" role="alert">This example could not load: {String(error)}</p>{/await}
      {#snippet failed(error,reset)}<div class="sample-error" role="alert"><p>This example encountered a rendering error.</p><pre>{String(error)}</pre><button onclick={reset}>Retry example</button></div>{/snippet}
     </svelte:boundary>{/key}
    </div>
   </div>
   <div class="example-caption"><Icon name="info" size={16}/><p>{current.custom?'An Unset composition of real shadcn components.':'An upstream example with local assets and Tabler Icons substitutions.'} Try its controls, keyboard focus and both appearances. {provisional?'This example includes an explicit integration beyond the base colour variables.':''}</p></div>
   <details class="check-notes"><summary>Coverage and limitations</summary><p>Every catalogue entry has a renderable example. The source and shared theme roles are recorded in the coverage manifest. A rendered example is not an exhaustive check of every variant, assistive technology or screen size.</p><p>Examples use local state. Form submissions and specimen navigation stay within the examples. Each consumer still needs integration and accessibility checks.</p></details>
   <div class="palette-strip" aria-label="Theme roles"><span style="background:var(--background)">Canvas</span><span style="background:var(--card)">Surface</span><span style="color:var(--link)">Link</span><span style="color:var(--link-visited)">Visited</span><span style="color:var(--success)">Success</span><span style="color:var(--warning)">Warning</span><span style="color:var(--danger)">Error</span></div>
  </main>
 </div>
 <footer>{brandMeta.sans} · {brandMeta.mono} · {brandMeta.icons}<span>Brand contract v{brandMeta.version} · Upstream c3b21a6</span></footer>
</div>
{#if notification}<div class="library-notice" role="status"><span>{notification}</span><button aria-label="Dismiss preview message" onclick={()=>notification=''}><Icon name="close" size={16}/></button></div>{/if}
</Tooltip.Provider>
