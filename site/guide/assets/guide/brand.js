const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#section-nav');
const tokenSearch = document.querySelector('#token-search');
const tokenResults = document.querySelector('#token-results');
const tokenCount = document.querySelector('#token-count');
let contract;
let tokenMap = new Map();
let iconData;
let currentTheme = 'dark';
let statusTimeout;
let visibleTokenLimit = 12;
const moreTokens = document.querySelector("#more-tokens");

try { currentTheme = localStorage.getItem('unset-brand-theme') === 'light' ? 'light' : 'dark'; } catch {}
root.dataset.theme = currentTheme;
root.style.colorScheme = currentTheme;

// Rendering resolver only. The downloaded contract remains the consumer interface.
function resolveToken(id, theme = currentTheme, visited = new Set()) {
  if (visited.has(id)) throw new Error(`Circular token reference: ${id}`);
  const token = tokenMap.get(id);
  if (!token) return undefined;
  visited.add(id);
  if (token.ref) return resolveToken(token.ref, theme, visited);
  return token.values?.[theme] ?? token.value;
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
}

function iconSize(role = 'control') {
  return resolveToken(contract?.icons?.sizeTokenRefs?.[role]) ?? (role === 'inline' ? '1rem' : role === 'standalone' ? '1.5rem' : '1.25rem');
}

function pixelLabel(value) {
  const text = String(value);
  if (text.endsWith('rem')) return `${Math.round(parseFloat(text) * 16)}px`;
  return text;
}

function renderIcon(holder) {
  const name = holder.dataset.icon;
  const nodes = iconData?.drawings?.[name];
  if (!nodes) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const size = holder.dataset.size ?? iconSize(holder.dataset.sizeRole);
  const attributes = {viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': String(resolveToken(contract?.icons?.strokeWidthToken) ?? iconData.defaultStroke), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', 'data-icon-family': 'tabler'};
  Object.entries(attributes).forEach(([name, value]) => svg.setAttribute(name, value));
  svg.style.width = String(size);
  svg.style.height = String(size);
  for (const [tag, attributes] of nodes) {
    const shape = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => shape.setAttribute(name, value));
    svg.append(shape);
  }
  holder.replaceChildren(svg);
}

function renderIcons(scope = document) { scope.querySelectorAll('[data-icon]').forEach(renderIcon); }

function setTheme(theme) {
  currentTheme = theme;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const next = theme === 'dark' ? 'light' : 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${next} appearance`);
  themeButton.querySelector('[data-icon]').dataset.icon = next === 'light' ? 'sun' : 'moon';
  setText('.theme-label', next === 'light' ? 'Light' : 'Dark');
  setText('#active-theme', theme);
  if (contract) {
    renderSwatches();
    renderTokenTable();
  }
  renderIcons();
  try { localStorage.setItem('unset-brand-theme', theme); } catch {}
}

const swatchGroups = {
  'foundation-swatches': [['color.ground','Canvas'],['color.surface-card','Card'],['color.surface-raised','Raised surface'],['color.surface-sunken','Inset surface'],['color.ink','Primary text'],['color.ink-muted','Secondary text']],
  'link-swatches': [['color.link','Unvisited link'],['color.link-visited','Visited link']],
  'feedback-swatches': [['color.success','Success'],['color.warning','Warning'],['color.danger','Error']]
};

function renderSwatches() {
  for (const [containerId, roles] of Object.entries(swatchGroups)) {
    const container = document.getElementById(containerId);
    container.replaceChildren();
    for (const [id, label] of roles) {
      const token = tokenMap.get(id);
      if (!token) continue;
      const article = document.createElement('div'); article.className = 'swatch';
      const chip = document.createElement('div'); chip.className = 'swatch-colour'; chip.style.background = resolveToken(id); chip.setAttribute('aria-hidden','true');
      const info = document.createElement('div'); info.className = 'swatch-info';
      const title = document.createElement('strong'); title.textContent = label;
      const role = document.createElement('code'); role.textContent = token.cssVariable ?? id;
      const value = document.createElement('code'); value.className = 'swatch-value'; value.textContent = resolveToken(id);
      info.append(title, role, value); article.append(chip, info); container.append(article);
    }
  }
}

async function copyValue(value, id) {
  const status = document.getElementById('copy-status');
  clearTimeout(statusTimeout);
  try { await navigator.clipboard.writeText(value); status.textContent = `Copied ${id}`; }
  catch { status.textContent = 'Copy is unavailable. Select the value in the table to copy it.'; }
  statusTimeout = setTimeout(() => { status.textContent = ''; }, 3500);
}

function renderTokenTable() {
  if (!contract) return;
  const query = tokenSearch.value.trim().toLowerCase();
  const tokens = contract.tokens.filter(token => [token.id,token.cssVariable,token.usage,token.kind,token.status].filter(Boolean).join(' ').toLowerCase().includes(query));
  tokenCount.textContent = `${Math.min(visibleTokenLimit,tokens.length)} of ${tokens.length} ${tokens.length === 1 ? 'token' : 'tokens'}${query ? ' found' : ''} · ${currentTheme} appearance`;
  moreTokens.hidden = visibleTokenLimit >= tokens.length;
  tokenResults.replaceChildren();
  for (const token of tokens.slice(0,visibleTokenLimit)) {
    const row = document.createElement('tr');
    const heading = document.createElement('th'); heading.scope = 'row';
    const id = document.createElement('code'); id.textContent = token.id;
    const usage = document.createElement('small'); usage.textContent = token.usage ?? token.cssVariable ?? token.kind;
    heading.append(id, usage);
    const valueCell = document.createElement('td'); valueCell.className = 'token-value';
    const value = String(resolveToken(token.id) ?? '—');
    const valueCode = document.createElement('code'); valueCode.textContent = value; valueCell.append(valueCode);
    const state = document.createElement('td'); state.className = 'token-status'; state.textContent = token.status;
    const actionCell = document.createElement('td');
    const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'copy-button'; copy.setAttribute('aria-label', `Copy ${token.id} value`); copy.addEventListener('click', () => copyValue(value,token.id));
    const glyph = document.createElement('span'); glyph.dataset.icon = 'copy'; glyph.dataset.sizeRole = 'inline'; copy.append(glyph); actionCell.append(copy);
    row.append(heading,valueCell,state,actionCell); tokenResults.append(row);
  }
  if (tokens.length === 0) {
    const row = document.createElement('tr'); const cell = document.createElement('td'); cell.colSpan = 4; cell.textContent = 'No matching tokens. Try a role such as link, control, or font.'; row.append(cell); tokenResults.append(row);
  }
  renderIcons(tokenResults);
}

function applyMetadata() {
  setText('[data-version]', contract.version);
  setText('[data-version-label]', `v${contract.version}`);
  setText('#component-count', contract.scope.catalogue.mainShadcnEntries);
  setText('#icon-version', contract.icons.version);
  setText('[data-stroke-width]', resolveToken(contract.icons.strokeWidthToken));
  for (const role of ['inline','control','standalone']) setText(`[data-icon-size="${role}"]`,pixelLabel(iconSize(role)));
  setText('[data-control-height]',pixelLabel(resolveToken('control.height')));
  for (const family of ['sans','mono']) {
    const name = String(resolveToken(`type.family.${family}`)).split(',')[0].replaceAll('"','').trim();
    setText(`[data-font="${family}"]`,name);
  }
  const prose = contract.typography.recipes.find(recipe => recipe.id === 'type.gallery-prose');
  if (prose?.fontSize) root.style.setProperty('--guide-body-size',prose.fontSize);
  if (prose?.lineHeight) root.style.setProperty('--guide-body-line-height',prose.lineHeight);
  document.querySelector('[download^="unset-brand-contract"]').download = `unset-brand-contract-${contract.version}.json`;
}

function closeMenu(restoreFocus = false) {
  navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open guide navigation');
  if (restoreFocus) menuButton.focus();
}

themeButton.addEventListener('click', () => setTheme(currentTheme === 'dark' ? 'light' : 'dark'));
tokenSearch.addEventListener('input',()=>{visibleTokenLimit=12;renderTokenTable();});
moreTokens.addEventListener('click',()=>{visibleTokenLimit+=12;renderTokenTable();});
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',`${open ? 'Close' : 'Open'} guide navigation`); });
navigation.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if (navigation.classList.contains('open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });

const sections = [...document.querySelectorAll('main>section')];
let scrollQueued = false;
function updateActiveSection() {
  scrollQueued = false;
  const top = document.querySelector('.header').getBoundingClientRect().bottom + 40;
  let active = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= top) active = section;
  navigation.querySelectorAll('nav a').forEach(link => { if (link.hash === `#${active.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateActiveSection); } }, {passive:true});

setTheme(currentTheme);
const responses = await Promise.allSettled([
  fetch(document.body.dataset.contractUrl).then(response => { if (!response.ok) throw new Error('Contract unavailable'); return response.json(); }),
  fetch(document.body.dataset.iconsUrl).then(response => { if (!response.ok) throw new Error('Icons unavailable'); return response.json(); })
]);
if (responses[1].status === 'fulfilled') {
  iconData = responses[1].value;
  const container = document.getElementById('icon-specimen');
  for (const name of ['home','user','search','bell','settings','folder','file-text','copy','check','circle-check','alert-triangle','circle-x','info-circle','menu','sun','moon']) {
    const item = document.createElement('div'); item.title = name; const glyph = document.createElement('span'); glyph.dataset.icon = name; glyph.dataset.sizeRole = 'standalone'; item.append(glyph); container.append(item);
  }
}
if (responses[0].status === 'fulfilled') {
  try {
    contract = responses[0].value;
    if (!Array.isArray(contract.tokens)) throw new Error('Unexpected token schema');
    tokenMap = new Map(contract.tokens.map(token => [token.id,token]));
    applyMetadata(); setTheme(currentTheme);
  } catch {
    tokenCount.textContent = 'The contract could not be read. Open the JSON download to inspect the source.';
  }
} else { tokenCount.textContent = 'The contract is unavailable. Reload the page or use the JSON download.'; }
renderIcons();
updateActiveSection();
