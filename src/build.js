import { writeFileSync } from "node:fs"
import { defu } from "defu"

import { defaultConfig } from "./config.js"
import { fluidSpace, fluidFontSize, fluidGrid } from "./fluid-calculator.js"
import { fluidLayouts } from "./layout-helpers.js"
import { fontStyles } from "./font-style-helpers.js"
import { openProps } from "./open-props.js"
import { handleShadows } from "./shadows.js"
import { generateBrand } from "./brand.js"
import { generateTheme } from "./theme.js"
import { generateSettings } from "./settings.js"
import { generateNormalize } from "./normalize.js"
import { generatePageLayout } from "./page-layout.js"
import { generateTables } from "./tables.js"
import { generateButtons } from "./buttons.js"
import { generateForms } from "./forms.js"
import { generateProse } from "./prose.js"
import { createRootSelector } from "./utils.js"

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
  const linesCSS = [`${rootSelectorStyled} {`, ...lines, "}\n"]
  const linesMediaDarkCSS = linesMediaDark.length
    ? [
        `${mediaDark} {`,
        `  ${rootSelectorStyled} {`,
        ...linesMediaDark,
        "  }",
        "}\n",
      ]
    : []
  return linesCSS.concat(linesMediaDarkCSS)
}

function buildScales(config) {
  const effectiveConfig = defu(config, defaultConfig)
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

function buildProps(config) {
  const effectiveConfig = defu(config, defaultConfig)
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

function buildObjects(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { classPrefix, propsPrefix, layoutHelpers, fontStyleHelpers } =
    effectiveConfig
  return [
    ...fluidLayouts({ classPrefix, propsPrefix, layoutHelpers }),
    ...fontStyles({ classPrefix, propsPrefix, fontStyleHelpers }),
  ]
}

const cssScales = buildScales({}).join("\n")
const cssProps = buildProps({}).join("\n")
const cssObjects = buildObjects({}).join("\n\n")
const cssBrand = generateBrand(defaultConfig)
const cssTheme = generateTheme(defaultConfig)
const cssSettings = generateSettings(defaultConfig)
const cssNormalize = generateNormalize(defaultConfig)
const cssPageLayout = generatePageLayout(defaultConfig)
const cssTables = generateTables(defaultConfig)
const cssButtons = generateButtons(defaultConfig)
const cssForms = generateForms(defaultConfig)
const cssProse = generateProse(defaultConfig)

const fileOutputScales = "./css/generated/scales.css"
const fileOutputProps = "./css/generated/props.css"
const fileOutputObjects = "./css/generated/objects.css"
const fileOutputBrand = "./css/generated/brand.css"
const fileOutputTheme = "./css/generated/theme.css"
const fileOutputSettings = "./css/generated/settings.css"
const fileOutputNormalize = "./css/generated/normalize.css"
const fileOutputPageLayout = "./css/generated/page-layout.css"
const fileOutputTables = "./css/generated/tables.css"
const fileOutputButtons = "./css/generated/buttons.css"
const fileOutputForms = "./css/generated/forms.css"
const fileOutputProse = "./css/generated/prose.css"

writeFileSync(fileOutputScales, cssScales)
writeFileSync(fileOutputProps, cssProps)
writeFileSync(fileOutputObjects, cssObjects)
writeFileSync(fileOutputBrand, cssBrand)
writeFileSync(fileOutputTheme, cssTheme)
writeFileSync(fileOutputSettings, cssSettings)
writeFileSync(fileOutputNormalize, cssNormalize)
writeFileSync(fileOutputPageLayout, cssPageLayout)
writeFileSync(fileOutputTables, cssTables)
writeFileSync(fileOutputButtons, cssButtons)
writeFileSync(fileOutputForms, cssForms)
writeFileSync(fileOutputProse, cssProse)
