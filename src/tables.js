import { where, css } from "./utils.js"

export function generateTables(config) {
  const { useWhere, mediaDark } = config

  return css`
    ${where(useWhere, "table")} {
      width: fit-content;
      caption-side: bottom;
      font-size: var(--font-size--1);
      border-collapse: collapse;
    }

    ${where(useWhere, ":is(thead, tbody) tr")} {
      border-bottom: var(--border-2);
    }

    ${where(useWhere, "th")} {
      color: var(--text-color-2);
      font-weight: var(--font-weight-6);
    }

    ${where(useWhere, "td")} {
      font-weight: var(--font-weight-body);
    }

    ${where(useWhere, "td, th")} {
      text-align: start;
      padding: var(--space-2) var(--space-3);
    }

    ${where(useWhere, ":is(td, th):not([align])")} {
      text-align: start;
    }

    ${where(useWhere, "table tr:hover td")} {
      background-color: var(--surface-2);

      ${mediaDark} {
        background-color: var(--surface-1);
      }
    }

    ${where(useWhere, "table > caption")} {
      font-weight: var(--font-weight-body-bold);
      padding-block: var(--space-3);
      color: var(--text-color-2);
    }
  `
}
