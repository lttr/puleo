import { defaultConfig } from "../config.js"
import { openProps } from "../open-props.js"
import { handleShadows } from "../shadows.js"
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

export function buildProps(config) {
  const effectiveConfig = { ...defaultConfig, ...config }
  const {
    borderRadius,
    borderSize,
    breakpoints,
    colors,
    easing,
    fontWeight,
    inlineSize,
    lineHeight,
    shadow,
    propsPrefix,
    useWhere,
    rootSelector,
    mediaDark,
  } = effectiveConfig

  const rulesInsideRootSelector = insideRootSelector(
    [
      borderRadius && openProps({ propsPrefix, names: borderRadius }),
      borderSize && openProps({ propsPrefix, names: borderSize }),
      breakpoints && openProps({ propsPrefix, names: breakpoints }),
      colors && openProps({ propsPrefix, names: colors }),
      easing && openProps({ propsPrefix, names: easing }),
      fontWeight && openProps({ propsPrefix, names: fontWeight }),
      inlineSize && openProps({ propsPrefix, names: inlineSize }),
      lineHeight && openProps({ propsPrefix, names: lineHeight }),
      shadow && handleShadows(shadow, propsPrefix),
    ],
    { useWhere, rootSelector, mediaDark },
  )

  return [...rulesInsideRootSelector].flat().filter(Boolean)
}
