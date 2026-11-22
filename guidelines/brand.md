# Unset brand usage

Unset is quiet, clear and technical. Recognition comes from the official
three-fisheye mark, typography, proportion and consistent details. The contract
in `src/contract.json` defines values and decision status; the guide and gallery
demonstrate them. No artwork or ASCII texture is required.

## Colour

Use semantic tokens rather than copied hex values. Graphite neutrals provide
canvas, surfaces, text, borders, selection and primary actions. Pacific belongs
to unvisited content links and lavender to visited links. Keep inline links
underlined; neutral navigation controls need not use content-link colours.

Success, warning and danger use green, amber and coral families; information
stays neutral. Pair state with clear text and, where useful, distinct icons.
Never use colour as the only cue. Do not borrow link colours for selected
controls, primary actions or neutral notices.

Use each state's matching foreground/background tokens. Decorative separators
and meaningful control borders have different roles. Verify actual adjacent
colours when composing a screen, including hover and focus.

## Typography

Space Grotesk carries headings, prose, labels and controls. JetBrains Mono
carries code, identifiers, versions and occasional short metadata. Use provided
fonts and fallbacks; retained normal variable slices have limited coverage.
Do not invent italic variants.

Use token sizes and comfortable reading measures. Test text resizing, reflow
and spacing overrides. A 16px body default is a design choice, not a WCAG
minimum font-size rule. Final shared headings and renderer typography remain
provisional where indicated. Moss & clay syntax applies inside code; it does
not redefine link or feedback colours outside it.

## Components and icons

[shadcn-svelte](https://www.shadcn-svelte.com/docs/components) supplies component
code; [Bits UI](https://www.bits-ui.com/docs/introduction) supplies headless
behaviour. Unset supplies visual styling through tokens and recipes. Consumers
remain responsible for labels, valid HTML, keyboard use and product behaviour.

Use pinned [Tabler Icons](https://tabler.io/icons) outline drawings, `currentColor`,
a `0 0 24 24` viewBox and a 2-unit stroke. Filled drawings are limited to mapped
state icons. Glyphs are 16px inline, 20px action/status, 24px standalone at a
16px root; pointer targets are separate. Controls use 40px comfortable, 32px
compact, 36px small/calendar and 44px large minimum heights.

Keep focus visible and unobscured. Hide decorative SVG from assistive technology;
icon-only controls need accessible names. Semantic status text remains necessary.

## Mark and shape

Use supplied mark assets and preserve geometry/clear space. Choose the appropriate
variant and check contrast on the real surface. Keep three units horizontal and
together except supplied single-unit favicon/app icons. See [logo.md](logo.md).

Use the shared spacing scale and current 0.25rem base radius. Historical cut
corners, hard offset shadows, ASCII controls and background art are superseded.

## Accessibility and adoption

Target WCAG 2.2 AA from the beginning: text/non-text contrast, non-colour cues,
keyboard, labels, focus, reflow and reduced motion. Automated pair checks are
limited evidence, not product certification. Pin a released package version,
review updates and rebuild consumers. Publishing alone does not update them.
