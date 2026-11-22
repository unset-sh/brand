unset.sh is Onyx and Platinum first, with three accents used sparingly: Raspberry Plum, Pacific Cyan and Emerald. The identity is one mark — three fisheyes, ◉◉◉ (U+25C9, also the brand's alias) — set on an Onyx ground, with type doing the rest.

## Mark

- Use the supplied files only; never redraw, recolour, rotate, space out or reorder the three units. The mark is always in the palette: `unset-mark-platinum.svg` on `ground` in Dark, `unset-mark-onyx.svg` on `ground` in Light (the Mark component does this by itself, in `ink`). The pure white and black files are only for print or places the palette can't reach.
- Keep clear space on every side of at least `mark-gap` (84/220 of one unit's diameter, about 0.4×).
- The three units always appear together and horizontally. The one exception is the favicon and app icons, which use a single unit (`unset-favicon.svg`, `unset-app-icon.svg`); a typed ◉ may also serve as a bullet.
- Never place the mark on a grey, a photo or an accent. It sits on `ground` or on an `ink` block (inverted).

## Colour

- Dark is the native theme: `ground` #17161B (Onyx lifted a little, Alex 2026-10-21), `ink` Platinum #F0EDEE. Light is Platinum `ground` with Onyx #0A090C `ink`. Onyx stays the brand's darkest colour: the `on-` text, the hover shadow under a lifted button, and the mark's own files. Build in Dark first.
- Text is `ink` on `ground`, `surface-raised` or `surface-card`; secondary text is `ink-muted`. Put nothing but `on-ink` on an `ink` fill.
- `line` is for decorative hairlines only; any border that means something (inputs, the outline buttons, selected state) is `line-strong`.
- Accents are for meaning and small moments, never for large backgrounds behind body copy: `emerald` for success, run and confirm actions and terminal output; `plum` for errors, destructive actions and the brand's loud moments; `cyan` for links (`link`) and information.
- Use the role aliases (`success`, `danger`, `link`) in UI code, and the colour names (`plum`, `cyan`, `emerald`) for brand graphics.
- Each accent has a per-theme value: take the token, never the source hex. The source hexes pass in only one theme each.
- Text on an accent fill is its `on-` token (`on-plum`, `on-cyan`, `on-emerald`), never white or black.
- State is never colour alone: always pair it with a bracketed word (`[ OK ]`, `[ ERR ]`, `[ INFO ]`). In Light, `success` and `danger` are close in lightness.
- No gradients. Shadows follow the elevation levels below; the only other shadow is `shadow-hard`, the solid copy under a hovered button (Onyx in Dark, darker than the page; grey in Light). Only the modal `scrim` is see-through; Cards are solid (Alex, 2026-10-04), so the ASCII field never shows behind text.

## Type

- Space Grotesk (`display` family) for headings and running text; JetBrains Mono (`mono` family) for commands, code, labels and anything a machine would print.
- The JetBrains Mono file is trimmed to what the brand uses: Latin (French included), punctuation, arrows, maths, technical symbols (⌘ ⏎), box drawing, block and geometric shapes (░ ◉ ▾), and dingbats (✓ ✕). There is no italic; don't set `mono` in italics.
- One `display` per view. Headings step `heading-1` → `heading-2` → `heading-3`; body is `body`, captions `body-small` in `ink-muted`.
- Buttons, tags and nav use `label`. Write the name lowercase, always with its `.sh`: unset.sh.
- Commands are shown as typed, prefixed with an `ink-muted` `$`, in `code` on `surface-raised`.

## Space and shape

- Spacing (padding, margins, gaps) sits on the 4px grid and uses the `space-` tokens: `space-3` inside blocks and controls, `space-4` inside panels and cards, `space-6` between blocks, `space-8` above section headings and around the footer, `space-12` between sections, `space-24` for hero padding. Hairlines, focus offsets and the 2px hover lift are not spacing.
- Buttons, form fields, menus and modals have 4px corners (`radius-sm`); every other box has 2px corners (`radius-xs`): raised blocks and cards. Buttons also cut 45° off the bottom-right corner (`cut`). Only rules, table cells and full-bleed bands stay square (`radius-0`); the full circle (`radius-full`) is kept for dots, discs and pills that echo the mark.
- Focus: a solid 2px `focus` outline, offset 2px.

## Elevation

Five levels. Height comes from lighter surfaces and quiet shadows; only the menu and the modal get outlines.

| Level | For | Surface | Edge | Stacking |
| --- | --- | --- | --- | --- |
| 0 · base | the page | `ground` | none | `z-base` |
| 1 · raised | code and command blocks, callouts, panels | `surface-raised` | `shadow-1` | `z-base` |
| 2 · card | Cards | `surface-card` | `shadow-2` | `z-card` |
| 3 · menu | Select lists, menus, popovers | `ground` | 1px `line-strong` + `shadow-menu` | `z-menu` |
| 4 · modal | Modal | `ground` over `scrim` | 1px `ink`, no shadow (the scrim lifts it) | `z-modal` |

- Never skip up a level for emphasis; pick the level by what the thing is.
- The site footer sits one step below the page, on `surface-sunken`; nothing else uses it.
- Hover lift (2px up-left + `shadow-hard`) is a state for buttons, not a level.

## Iconography

- Icons are Iconoir (regular set, 1.5 stroke, in the text colour), from the closed list on the Icon component (Iconoir chosen by Alex 2026-10-03 for consistency; the list of 36 approved the same day). The drawings are copied into the kit at a pinned version, never loaded from a package or the network. Callouts keep their plain `i` `!` `+` `*` in a dashed box, and a typed ◉ may still serve as a bullet.
- Status words stay bracketed text with quiet brackets: `[ OK ]`, `[ ERR ]`, `[ INFO ]`.
- Controls and indicators are drawn as text too: checkboxes `[×]` / `[ ]`, radios `(•)` / `( )`, progress `[#####-----] 50%`, the spinner `|` `/` `-` `\`. Keep real inputs underneath for keyboards and screen readers.
- The ASCII field (` .:-=+*#%@`) is the brand's texture: one per page, behind a hero or a Card grid, never behind bare text.
- Never emoji. Text set in `mono` uses only characters the font draws, with U+FE0E after symbols that have an emoji form (⚠︎).
