export function fontStyles({ classPrefix, propsPrefix, fontStyleHelpers }) {
  const helpers = {
    /* Regular text */
    "secondary-text-regular": `.${classPrefix}secondary-text-regular {
  font-size: var(--${propsPrefix}font-size--1);
}`,

    "additional-text-regular": `.${classPrefix}additional-text-regular {
  font-size: var(--${propsPrefix}font-size--2);
}`,

    /* Bold text */
    "base-text-bold": `.${classPrefix}base-text-bold {
  font-weight: var(--${propsPrefix}font-weight-body-bold);
  font-size: var(--${propsPrefix}font-size-0);
}`,

    "secondary-text-bold": `.${classPrefix}secondary-text-bold {
  font-weight: var(--${propsPrefix}font-weight-body-bold);
  font-size: var(--${propsPrefix}font-size--1);
}`,

    "additional-text-bold": `.${classPrefix}additional-text-bold {
  font-weight: var(--${propsPrefix}font-weight-body-bold);
  font-size: var(--${propsPrefix}font-size--2);
}`,

    /* Special text */
    "input-text": `.${classPrefix}input-text {
  font-size: var(--${propsPrefix}font-size--1);
  font-weight: var(--${propsPrefix}font-weight-body);
}`,

    /* Headings text */
    "heading-1": `.${classPrefix}heading-1 {
  font-size: var(--${propsPrefix}font-size-h1);
  font-weight: var(--${propsPrefix}font-weight-headings);
}`,

    "heading-2": `.${classPrefix}heading-2 {
  font-size: var(--${propsPrefix}font-size-h2);
  font-weight: var(--${propsPrefix}font-weight-headings);
}`,

    "heading-3": `.${classPrefix}heading-3 {
  font-size: var(--${propsPrefix}font-size-h3);
  font-weight: var(--${propsPrefix}font-weight-headings);
}`,

    "heading-4": `.${classPrefix}heading-4 {
  font-size: var(--${propsPrefix}font-size-h4);
  font-weight: var(--${propsPrefix}font-weight-headings);
}`,
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
