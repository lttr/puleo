# Puleo CSS

An attempt to build a mid-level CSS library forming a good starting point for
custom designs. Opinionated on demand.

## Basic ideas

- Should work in 3 ways
  - Import a CSS file and start prototyping
  - Configure with a set of design tokens
  - Create you own composition from individual building blocks
- Build on top of ideas, that are already out there
  - [Normalize]()
  - [Every Layout](https://every-layout.dev/)
  - [Open props](https://open-props.style/)
  - [Pollen](https://www.pollen.style/)
  - [Tailwind](https://tailwindcss.com/)
  - [Utopia](https://utopia.fyi/)
- CSS is good enough
  - No need for alternative techniques like utility class framework, CSS in JS etc.
  - No need for a pre-processor
  - Transpilation of newer CSS features allows to use standard CSS from the future
- Scoping on components level is good
  - Ment to be used with CSS, that is scoped to components (like Vue or Svelte
    scoped style blocks or upcoming CSS native scoping; BEM does the job as well
    but it is not preffered)
- Base styling layer needs (with [ITCSS](https://benmarshall.me/itcss/) layer associations)
  - set of primitive values (physical variables/props) (-> Settings)
  - set of semantic variables/design tokens (-> Settings)
  - type, space and grid system (-> Tools)
  - CSS reset/normalization (-> Generic)
  - brand specific reset (-> Generic)
  - improved HTML elements (-> Elements)
  - utility classes for a couple of text styles (-> Objects)
  - utility classes for often used layouts (-> Objects)
  - individual component styles (-> Components)
  - utility classes for other aspects (like .visually-hidden) (-> Utilities)
