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
