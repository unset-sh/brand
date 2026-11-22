<script lang="ts">
 import * as CodeBlock from '$lib/registry/ui/code-block/index.js';
 import { Button } from '$lib/registry/ui/button/index.js';
 import { Icon } from '$lib/components/icon';
 import syntax from '../syntax-samples.json';
 import brandMeta from '$brand-dist/meta.json';
 let wrap = $state(false);
 let language = $state('typescript');
 const fixture = $derived(syntax.fixtures.find(f => f.id === language)!);
 const lines = $derived(syntax.samples[language as keyof typeof syntax.samples]);
 const roles = [
  {key:'keyword', label:'Keywords'}, {key:'string', label:'Strings'},
  {key:'name', label:'Names & types'}, {key:'literal', label:'Values'},
  {key:'comment', label:'Comments'}
 ] as const;
</script>

<div class="syntax-study">
 <div class="syntax-description"><strong>Moss &amp; clay</strong><p>A restrained palette for code, with the same colour roles in light and dark appearances.</p></div>
 <label class="syntax-language">Language<select bind:value={language} aria-label="Code language">{#each syntax.fixtures as f}<option value={f.id}>{f.label}</option>{/each}</select></label>
 <CodeBlock.Root>
  <CodeBlock.Header>
   <CodeBlock.Title>{fixture.filename}</CodeBlock.Title>
   <CodeBlock.Actions><Button variant="ghost" size="icon-xs" aria-label="Wrap code lines" aria-pressed={wrap} onclick={()=>wrap=!wrap}><Icon name="list"/></Button><CodeBlock.CopyButton value={fixture.code}/></CodeBlock.Actions>
  </CodeBlock.Header>
  <CodeBlock.Content {wrap} lineNumbers>{#each lines as line}<CodeBlock.Line code={line}/>{/each}</CodeBlock.Content>
  <CodeBlock.Footer>Moss &amp; clay · {brandMeta.mono}</CodeBlock.Footer>
 </CodeBlock.Root>
 <div class="syntax-key" aria-label="Syntax colour roles">{#each roles as role}<span><i style:background={`var(--syntax-${role.key})`} aria-hidden="true"></i>{role.label}</span>{/each}</div>
 <p class="syntax-note">Muted colour gives code structure. Pacific and lavender stay with links. Each syntax colour passes 4.5:1 against its code surface in both appearances.</p>
 <details class="syntax-diff"><summary>Added and removed lines</summary><div>
  <CodeBlock.Root><CodeBlock.Header><CodeBlock.Title>Example change</CodeBlock.Title></CodeBlock.Header><CodeBlock.Content>
   <CodeBlock.Line code="visibility: 'private'" variant="removed"/>
   <CodeBlock.Line code="visibility: 'public'" variant="added"/>
  </CodeBlock.Content><CodeBlock.Footer>+ / − markers accompany semantic colour.</CodeBlock.Footer></CodeBlock.Root>
 </div></details>
 <p class="syntax-note">Moss &amp; clay is the shared code theme. The colours and portable Shiki themes are generated from the brand contract.</p>
</div>

<style>
 .syntax-study{width:100%;max-width:850px;min-width:0}
 .syntax-description{font-size:14px;line-height:1.6;margin-bottom:16px}
 .syntax-description strong{font-weight:500}.syntax-description p{color:var(--muted-foreground);margin:3px 0 0}
 .syntax-language{font-size:14px;font-weight:500;display:flex;align-items:center;gap:12px;margin-bottom:12px}
 .syntax-language select{border:1px solid var(--input);border-radius:var(--radius);padding:8px 30px 8px 12px;background:var(--background);color:var(--foreground);min-height:40px;max-width:100%}
 .syntax-key{display:flex;flex-wrap:wrap;gap:9px 16px;margin-top:16px;font-size:12px;color:var(--muted-foreground)}
 .syntax-key span{display:flex;align-items:center;gap:6px}.syntax-key i{display:block;width:8px;height:8px;border-radius:50%}
 .syntax-note{font-size:14px;line-height:1.6;color:var(--muted-foreground);margin:16px 0 0}
 .syntax-diff{font-size:14px;margin-top:20px;border-top:1px solid var(--border);padding-top:16px}
 .syntax-diff summary{cursor:pointer;min-height:32px}.syntax-diff>div{margin-top:12px}
</style>
