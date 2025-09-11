import { createWhere, css } from "./utils.js"

export function generateButtons(config) {
  const { useWhere, mediaDark } = config
  const where = createWhere(useWhere)

  return css`
    /* Based on Open Props buttons.css */
    /* https://github.com/argyleink/open-props/blob/main/src/extra/buttons.css */

    /* Let form controls to look like other elements. */
    ${where(
      'button, input:is([type="button"], [type="submit"], [type="reset"])',
    )},
    ${where('input[type="file"]::-webkit-file-upload-button')},
    ${where('input[type="file"]::file-selector-button')} {
      font: inherit;
      letter-spacing: inherit;
    }

    ${where(
      '.p-button, button, input:is([type="button"], [type="submit"], [type="reset"])',
    )},
    ${where('input[type="file"]::-webkit-file-upload-button')},
    ${where('input[type="file"]::file-selector-button')} {
      --_font-size: var(--font-size--1);
      --_bg-color: var(--surface-2-inverse);
      --_bg-color-hover: var(--surface-3-inverse);
      --_bg-color-active: var(--surface-2-inverse);
      --_text-color: var(--text-color-1-inverse);
      --_border-color: var(--_bg-color);
      --_icon-size: 3ch;
      --_icon-color: var(--_text-color);

      height: var(--button-height-default);
      font-size: var(--_font-size);
      background-color: var(--_bg-color);
      color: var(--_text-color);
      border: var(--border-size-1) solid var(--_border-color);
      box-shadow:
        var(--shadow-2),
        0 0 1px 1px var(--surface-3);

      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: var(--space-2);

      font-family: var(--font-family-body);
      font-weight: var(--font-weight-buttons);
      border-radius: var(--radius-default);
      padding-block: 0.75ch;
      padding-inline: var(--space-3);

      user-select: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;

      ${mediaDark} {
        --_text-color: var(--text-color-1);
        --_bg-color: var(--surface-3);
        --_bg-color-hover: var(--surface-2);
        --_bg-color-active: var(--surface-3);
        box-shadow: var(--shadow-2);
      }

      @media (--motionOK) {
        transition:
          border-color 120ms var(--ease-3),
          box-shadow 120ms var(--ease-4),
          outline-offset 120ms var(--ease-4);
      }
    }

    /* Importance primary/secondary */
    ${where(".p-button-secondary")} {
      --_text-color: var(--text-color-1);
      --_bg-color: var(--surface-0);
      --_bg-color-hover: var(--surface-2);
      --_bg-color-active: var(--surface-1);
      --_border-color: var(--surface-2);
      box-shadow: var(--shadow-2);
    }

    /* Variant brand */
    ${where(".p-button-brand")} {
      --_text-color: var(--text-color-1-inverse);
      --_bg-color: var(--brand-color);
      --_bg-color-hover: var(--brand-color-bright);
      --_bg-color-active: var(--brand-color);
    }

    ${where(
      '.p-button, button, input:is([type="button"], [type="submit"], [type="reset"], [type="file"])',
    )} {
      /* disabled */
      &[disabled] {
        --_bg-color: var(--surface-2);
        --_border-color: var(--surface-2);
        --_text-color: var(--gray-7);
        cursor: not-allowed;
        box-shadow: var(--shadow-1);

        ${mediaDark} {
          --_text-color: var(--gray-5);
        }
      }

      &${where(":not(:disabled):hover")} {
        background-color: var(--_bg-color-hover);
      }

      &${where(":not(:disabled):active")} {
        background-color: var(--_bg-color-active);
      }

      /* icons */
      & > ${where("svg")} {
        flex-shrink: 0;
        block-size: var(--_icon-size);
        inline-size: var(--_icon-size);
        color: var(--_bg-color);
        fill: var(--_icon-color);

        ${mediaDark} {
          fill: var(--_icon-color);
        }
      }
    }

    /* red reset */
    ${where('[type="reset"]')} {
      --_text-color: var(--red-9);

      --_bg-color: var(--surface-0);
      --_bg-color-hover: var(--surface-2);
      --_bg-color-active: var(--surface-1);
      --_border-color: var(--surface-2);
      box-shadow: var(--shadow-2);

      &:focus-visible {
        outline-color: var(--red-6);
      }

      ${mediaDark} {
        --_text-color: var(--red-4);
      }
    }

    ${where("a.p-button")} {
      &:hover {
        text-decoration: none;
      }
    }

    /* file input */
    ${where('input[type="file"]')} {
      max-inline-size: 100%;
      padding-inline: var(--space-1);
      padding-block: 0;
      cursor: initial;
      align-self: flex-start;
      border-radius: var(--radius-2);
      box-shadow: var(--inner-shadow-4);
      color: var(--text-color-1);
      border: 1px solid var(--gray-3);
      font-size: var(--font-size--1);
      font-weight: var(--font-weight-buttons);
      line-height: var(--line-height-headings);

      &.p-dropping {
        border: 1px solid transparent;
        box-shadow: none;
        outline: 2px dashed var(--text-color-2);

        @media (prefers-reduced-motion: no-preference) {
          animation: drop-zone 1.5s var(--ease-5) infinite;
        }
      }
    }

    ${where('input[type="file"]::-webkit-file-upload-button')},
    ${where('input[type="file"]::file-selector-button')} {
      margin-inline-end: var(--space-2);
      cursor: pointer;
      margin: var(--space-3);

      ${mediaDark} {
        border-color: transparent;
      }

      &:hover {
        background-color: var(--_bg-color-hover);
      }

      &:active {
        background-color: var(--_bg-color-active);
      }
    }
  `
}
