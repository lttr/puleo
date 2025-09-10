import { css } from "./utils.js"

export function fontStyles({ classPrefix, propsPrefix, fontStyleHelpers }) {
  const helpers = {
    /* Regular text */
    "secondary-text-regular": css`
      .${classPrefix}secondary-text-regular {
        font-size: var(--${propsPrefix}font-size--1);
      }
    `,

    "additional-text-regular": css`
      .${classPrefix}additional-text-regular {
        font-size: var(--${propsPrefix}font-size--2);
      }
    `,

    /* Bold text */
    "base-text-bold": css`
      .${classPrefix}base-text-bold {
        font-weight: var(--${propsPrefix}font-weight-body-bold);
        font-size: var(--${propsPrefix}font-size-0);
      }
    `,

    "secondary-text-bold": css`
      .${classPrefix}secondary-text-bold {
        font-weight: var(--${propsPrefix}font-weight-body-bold);
        font-size: var(--${propsPrefix}font-size--1);
      }
    `,

    "additional-text-bold": css`
      .${classPrefix}additional-text-bold {
        font-weight: var(--${propsPrefix}font-weight-body-bold);
        font-size: var(--${propsPrefix}font-size--2);
      }
    `,

    /* Special text */
    "input-text": css`
      .${classPrefix}input-text {
        font-size: var(--${propsPrefix}font-size--1);
        font-weight: var(--${propsPrefix}font-weight-body);
      }
    `,

    /* Headings text */
    "heading-1": css`
      .${classPrefix}heading-1 {
        font-size: var(--${propsPrefix}font-size-h1);
        font-weight: var(--${propsPrefix}font-weight-headings);
      }
    `,

    "heading-2": css`
      .${classPrefix}heading-2 {
        font-size: var(--${propsPrefix}font-size-h2);
        font-weight: var(--${propsPrefix}font-weight-headings);
      }
    `,

    "heading-3": css`
      .${classPrefix}heading-3 {
        font-size: var(--${propsPrefix}font-size-h3);
        font-weight: var(--${propsPrefix}font-weight-headings);
      }
    `,

    "heading-4": css`
      .${classPrefix}heading-4 {
        font-size: var(--${propsPrefix}font-size-h4);
        font-weight: var(--${propsPrefix}font-weight-headings);
      }
    `,
  }
  return Object.values(pickKeys(helpers, fontStyleHelpers))
}

function pickKeys(obj, keys) {
  const picked = {}
  for (const key of keys) {
    if (Object.hasOwn(obj, key)) {
      picked[key] = obj[key]
    }
  }
  return picked
}
