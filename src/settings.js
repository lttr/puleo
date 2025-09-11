import { createRootSelector, css } from "./utils.js"

export function generateSettings(config) {
  const { useWhere, rootSelector: rootSelectorConfig, mediaDark } = config
  const rootSelector = createRootSelector(useWhere, rootSelectorConfig)

  return css`
    /*
    * Default values for semantic props (i.e. design tokens).
    */

    ${rootSelector} {
      /* text */
      --font-family-body: sans-serif;
      --font-size-body: var(--font-size-0);
      --font-size-h1: var(--font-size-4);
      --font-size-h2: var(--font-size-3);
      --font-size-h3: var(--font-size-2);
      --font-size-h4: var(--font-size-1);
      --font-size-h5: var(--font-size-0);
      --font-weight-body-bold: var(--font-weight-6);
      --font-weight-body: var(--font-weight-4);
      --font-weight-headings: var(--font-weight-6);
      --font-weight-light: var(--font-weight-3);
      --line-height-body: var(--font-lineheight-3);
      --line-height-headings: var(--font-lineheight-1);

      /* colors */
      --text-color-1: var(--gray-12);
      --text-color-2: var(--gray-7);
      --text-color-1-inverse: var(--gray-1);
      --text-color-2-inverse: var(--gray-4);

      --surface-0: white;
      --surface-1: var(--gray-1);
      --surface-2: var(--gray-2);
      --surface-3: var(--gray-3);
      --surface-4: var(--gray-4);
      --surface-0-inverse: var(--gray-10);
      --surface-1-inverse: var(--gray-9);
      --surface-2-inverse: var(--gray-8);
      --surface-3-inverse: var(--gray-7);
      --surface-4-inverse: var(--gray-6);

      --accent-color: var(--brand-color);
      --caret-color: var(--brand-color);
      --focus-color: var(--brand-color);

      --text-color-body: var(--text-color-1);
      --text-color-headings: var(--text-color-1);
      --bg-color-body: var(--surface-0);

      --link-color: var(--blue-8);
      --link-color-visited: var(--purple-7);

      --positive-color: var(--green-9);
      --negative-color: var(--red-8);

      --error-alert-color: var(--red-11);
      --error-alert-bg-color: var(--red-1);

      --positive-alert-color: var(--green-11);
      --positive-alert-bg-color: var(--green-1);

      --scrollthumb-color: var(--gray-7);

      /* a11y */
      --outline-offset: 2px;

      /* forms and inputs */
      --input-radius: var(--radius-default);
      --font-weight-label: var(--font-weight-5);

      /* buttons */
      --button-height-default: 2.25rem;
      --font-weight-buttons: var(--font-weight-6);

      /* borders */
      --border-size-default: var(--border-size-1);
      --radius-default: var(--radius-2);
      --border-1: var(--border-size-1) solid var(--surface-2);
      --border-2: var(--border-size-1) solid var(--surface-3);
      --border-3: var(--border-size-1) solid var(--surface-4);
      --border-4: var(--border-size-1) solid var(--text-color-2);
      --border-5: var(--border-size-1) solid var(--text-color-1);

      /* inline-size */
      /* keep max-inline-size initial by default, this is opt-in */
      /* --max-inline-size-h1: var(--size-header-1); */
      /* --max-inline-size-h2: var(--size-header-2); */
      /* --max-inline-size-other-headings: var(--size-header-3); */
      /* --max-inline-size-elements: var(--size-content-2); */
      /* --max-inline-size-p: var(--size-content-3); */
    }

    ${mediaDark} {
      ${rootSelector} {
        --text-color-1: var(--gray-1);
        --text-color-2: var(--gray-4);
        --text-color-1-inverse: var(--gray-12);
        --text-color-2-inverse: var(--gray-7);

        --surface-0: var(--gray-10);
        --surface-1: var(--gray-9);
        --surface-2: var(--gray-8);
        --surface-3: var(--gray-7);
        --surface-4: var(--gray-6);
        --surface-0-inverse: white;
        --surface-1-inverse: var(--gray-1);
        --surface-2-inverse: var(--gray-2);
        --surface-3-inverse: var(--gray-3);
        --surface-4-inverse: var(--gray-4);

        --bg-color-body: var(--surface-1);

        --scrollthumb-color: var(--gray-6);

        --positive-color: var(--green-6);
        --negative-color: var(--red-6);
        --error-alert-color: var(--red-1);
        --error-alert-bg-color: var(--red-11);
        --positive-alert-color: var(--green-11);
        --positive-alert-bg-color: var(--green-1);

        --link-color: var(--blue-4);
        --link-color-visited: var(--purple-3);

        --focus-color: var(--brand-color-bright);
      }
    }
  `
}
