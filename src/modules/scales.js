import { defaultConfig } from "../config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "../fluid-calculator.js"
import { createRootSelector } from "../utils.js"

const MEDIA_DARK_MARKER = "-@media:dark"

function insideRootSelector(groups, { useWhere, rootSelector, mediaDark }) {
  const linesMediaDark = []
  const lines = groups.map((group) => [
    ...group
      .filter((rule) => {
        const isRuleForMediaDark = rule.includes(MEDIA_DARK_MARKER)
        if (isRuleForMediaDark) {
          linesMediaDark.push(`    ${rule.replace(MEDIA_DARK_MARKER, "")}`)
        }
        return !isRuleForMediaDark
      })
      .map((rule) => {
        return `  ${rule}`
      }),
    " ",
  ])
  const rootSelectorStyled = createRootSelector(useWhere, rootSelector)
  const linesCSS = [`${rootSelectorStyled} {`, ...lines, "}"]
  const linesMediaDarkCSS = linesMediaDark.length
    ? [
        `${mediaDark} {`,
        `  ${rootSelectorStyled} {`,
        ...linesMediaDark,
        "  }",
        "}",
      ]
    : []
  return linesCSS.concat(linesMediaDarkCSS)
}

export function buildScales(config) {
  const effectiveConfig = { ...defaultConfig, ...config }
  const {
    fluid,
    fontSize,
    grid,
    propsPrefix,
    useWhere,
    rootSelector,
    mediaDark,
    space,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(
    [
      space && fluidSpace({ propsPrefix, ...fluid, space }),
      fontSize && fluidFontSize({ propsPrefix, ...fluid, fontSize }),
      grid && fluidGrid({ propsPrefix, ...fluid, ...grid, space }),
    ],
    { useWhere, rootSelector, mediaDark },
  )

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}
