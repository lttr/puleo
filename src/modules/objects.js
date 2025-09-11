import { defu } from "defu"

import { defaultConfig } from "../config.js"
import { fluidLayouts } from "../layout-helpers.js"
import { fontStyles } from "../font-style-helpers.js"

export function buildObjects(config) {
  const effectiveConfig = defu(config, defaultConfig)
  const { classPrefix, propsPrefix, layoutHelpers, fontStyleHelpers } =
    effectiveConfig
  return [
    ...fluidLayouts({ classPrefix, propsPrefix, layoutHelpers }),
    ...fontStyles({ classPrefix, propsPrefix, fontStyleHelpers }),
  ]
}
