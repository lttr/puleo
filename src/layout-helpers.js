export function fluidLayouts({ prefix, layoutHelpers }) {
  const helpers = {
    container: `.${prefix}container {
  max-width: var(--${prefix}grid-max-width);
  padding-inline: var(--${prefix}grid-gutter);
  margin-inline: auto;
}
`,

    grid: `.${prefix}grid {
  display: grid;
  gap: var(--${prefix}grid-gutter);
}
`,

    "auto-grid": `.${prefix}auto-grid {
  --${prefix}auto-grid-min: var(--${prefix}size-content-2);

  display: grid;
  column-gap: var(--${prefix}grid-gutter);
  row-gap: var(--${prefix}space-3-4);
  grid-template-columns: repeat(
    var(--${prefix}auto-grid-repeat, auto-fit),
    minmax(min(100%, var(--${prefix}auto-grid-min)), 1fr)
  );
}
`,

    flow: `.${prefix}flow > * + * {
  margin-block-start: var(--${prefix}flow-space, 1em);
}
`,

    center: `.${prefix}center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
}
`,

    stack: `.${prefix}stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:only-child {
    block-size: 100%;
  }

  > * + * {
    margin-block-start: var(--${prefix}stack-space, var(--${prefix}space-5));
  }
}
`,

    cluster: `.${prefix}cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--${prefix}cluster-space, var(--${prefix}space-3));
}
`,

    switcher: `.${prefix}switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--${prefix}switcher-space, var(--${prefix}space-6));

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
      (var(--${prefix}switcher-treshold, var(--${prefix}size-content-3)) - 100%) *
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
