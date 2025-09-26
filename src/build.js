import { writeFileSync } from "node:fs"

import { defaultConfig } from "./config.js"
import { generateBrand } from "./modules/brand.js"
import { generateTheme } from "./modules/theme.js"
import { generateSettings } from "./modules/settings.js"
import { generateNormalize } from "./modules/normalize.js"
import { generatePageLayout } from "./modules/page-layout.js"
import { generateTables } from "./modules/tables.js"
import { generateButtons } from "./modules/buttons.js"
import { generateForms } from "./modules/forms.js"
import { generateProse } from "./modules/prose.js"
import { buildScales } from "./modules/scales.js"
import { buildProps } from "./modules/props.js"
import { buildObjects } from "./modules/objects.js"

function build(customConfig = {}) {
  const config = { ...defaultConfig, ...customConfig }
  const suffix = config.rootSelector === ":host" ? ".host" : ""

  const cssScales = buildScales(config).join("\n")
  const cssProps = buildProps(config).join("\n")
  const cssObjects = buildObjects(config).join("\n\n")
  const cssBrand = generateBrand(config)
  const cssTheme = generateTheme(config)
  const cssSettings = generateSettings(config)
  const cssNormalize = generateNormalize(config)
  const cssPageLayout = generatePageLayout(config)
  const cssTables = generateTables(config)
  const cssButtons = generateButtons(config)
  const cssForms = generateForms(config)
  const cssProse = generateProse(config)

  const fileOutputScales = `./css/generated/scales${suffix}.css`
  const fileOutputProps = `./css/generated/props${suffix}.css`
  const fileOutputObjects = `./css/generated/objects${suffix}.css`
  const fileOutputBrand = `./css/generated/brand${suffix}.css`
  const fileOutputTheme = `./css/generated/theme${suffix}.css`
  const fileOutputSettings = `./css/generated/settings${suffix}.css`
  const fileOutputNormalize = `./css/generated/normalize${suffix}.css`
  const fileOutputPageLayout = `./css/generated/page-layout${suffix}.css`
  const fileOutputTables = `./css/generated/tables${suffix}.css`
  const fileOutputButtons = `./css/generated/buttons${suffix}.css`
  const fileOutputForms = `./css/generated/forms${suffix}.css`
  const fileOutputProse = `./css/generated/prose${suffix}.css`

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
}

// Export build function for use in variants
export { build }

// Default build when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build()
}
