import { css } from "./utils.js"

export function generateProse(config) {
  const { classPrefix } = config

  return css`
    :where(.${classPrefix}prose) {
      /* centered text with maximal width (the measure) */
      max-inline-size: var(--size-measure, var(--size-content-3));
      margin-inline: auto;

      /* like p-flow utility but bigger vertical gaps */
      * + *:not(figcaption, hr, li, .${classPrefix}not-prose *) {
        margin-block-start: 1.2em;
      }

      :where(ul) {
        list-style-type: disc;
        padding-inline: revert-layer;
        margin-inline: revert-layer;
      }

      :where(ul, ol) {
        p {
          margin-block-start: revert-layer;
        }

        :where(ul, ol) {
          margin-block-start: revert-layer;
        }

        :where(li) {
          margin-block-start: 0.5em;

          &::marker {
            color: var(--text-color-2);
          }
        }
      }

      :where(pre) {
        font-size: var(--font-size--1);
        padding-inline: var(--space-4);
        padding-block: var(--space-3);
        margin-block: var(--space-6);
        background-color: var(--text-color-1-inverse);
        overflow-x: auto;
        max-inline-size: 100%;
      }
    }
  `
}
