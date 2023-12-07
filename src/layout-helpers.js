export function fluidLayouts({ classPrefix, propsPrefix, layoutHelpers }) {
  const helpers = {
    container: `.${classPrefix}container {
  max-width: var(--${propsPrefix}grid-max-width);
  padding-inline: var(--${propsPrefix}grid-gutter);
  margin-inline: auto;
}
`,

    grid: `.${classPrefix}grid {
  display: grid;
  gap: var(--${propsPrefix}grid-gutter);
}
`,

    "auto-grid": `.${classPrefix}auto-grid {
  --${propsPrefix}auto-grid-min: var(--${propsPrefix}size-content-2);

  display: grid;
  column-gap: var(--${propsPrefix}grid-gutter);
  row-gap: var(--${propsPrefix}space-3-4);
  grid-template-columns: repeat(
    var(--${propsPrefix}auto-grid-repeat, auto-fit),
    minmax(min(100%, var(--${propsPrefix}auto-grid-min)), 1fr)
  );
}
`,

    flow: `.${classPrefix}flow > * + * {
  margin-block-start: var(--${propsPrefix}flow-space, 1em);
}
`,

    center: `.${classPrefix}center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
}
`,

    stack: `.${classPrefix}stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:only-child {
    block-size: 100%;
  }

  > * + * {
    margin-block-start: var(--${propsPrefix}stack-space, var(--${propsPrefix}space-5));
  }
}
`,

    cluster: `.${classPrefix}cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--${propsPrefix}cluster-space, var(--${propsPrefix}space-3));
}
`,

    switcher: `.${classPrefix}switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--${propsPrefix}switcher-space, var(--${propsPrefix}space-6));

  > * {
    /*
     * Applying different flex-grow for each child allows for different
     * proportions, if needed.
     */
    flex-grow: 1;
    /*
     * The calc function produces very large positive or negative number.
     * In case it is negative, this rule will be ignored by the browser.
     * In case it is positive, it grabs an equal amount of space for each child.
     */
    flex-basis: calc(
      (var(--${propsPrefix}switcher-treshold, var(--${propsPrefix}size-content-3)) - 100%) *
        999
    );
  }
}
`,
  }
  return Object.values(pickKeys(helpers, layoutHelpers))
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
