import { writeFileSync, mkdirSync } from "node:fs"

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

function buildForSelector(rootSelector, customConfig = {}) {
  const config = { ...defaultConfig, ...customConfig, rootSelector }
  const folder = rootSelector === ":host" ? "host" : "root"

  // Create directory if it doesn't exist
  mkdirSync(`./css/generated/${folder}`, { recursive: true })

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

  const fileOutputScales = `./css/generated/${folder}/scales.css`
  const fileOutputProps = `./css/generated/${folder}/props.css`
  const fileOutputObjects = `./css/generated/${folder}/objects.css`
  const fileOutputBrand = `./css/generated/${folder}/brand.css`
  const fileOutputTheme = `./css/generated/${folder}/theme.css`
  const fileOutputSettings = `./css/generated/${folder}/settings.css`
  const fileOutputNormalize = `./css/generated/${folder}/normalize.css`
  const fileOutputPageLayout = `./css/generated/${folder}/page-layout.css`
  const fileOutputTables = `./css/generated/${folder}/tables.css`
  const fileOutputButtons = `./css/generated/${folder}/buttons.css`
  const fileOutputForms = `./css/generated/${folder}/forms.css`
  const fileOutputProse = `./css/generated/${folder}/prose.css`

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

function build(customConfig = {}) {
  // Create output directory if it doesn't exist
  mkdirSync("./output", { recursive: true })

  // Generate files for :root selector
  buildForSelector(":root", customConfig)

  // Generate files for :host selector
  buildForSelector(":host", customConfig)
}

// Export build function for use in variants
export { build }

// Default build when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build()
}
