import postcssPresetEnv from "postcss-preset-env"
import postcssImport from "postcss-import"
import postcssGlobalData from "@csstools/postcss-global-data"
import darkThemeClass from "postcss-dark-theme-class"

const plugins = [
  postcssImport(),
  postcssGlobalData({
    files: ["./node_modules/open-props/media.min.css"],
  }),
  postcssPresetEnv(
    // Options for postcss-preset-env: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
    {
      stage: false, // Exlusively use features, don't include any polyfill's by default
      // Autoprefixer still used e.g. for
      // -webkit-user-select, -webkit-backdrop-filter, etc.
      autoprefixer: true,
      features: {
        "color-function": true, // Baseline: Newly available since 5/2023
        "color-mix": true, // Baseline: Newly available since 5/2023
        "custom-media-queries": true, // Draft standard: Media queries level 5
        "media-query-ranges": true, // Baseline: Newly available since 3/2023
        "nesting-rules": true, // Baseline: Newly available since 12/2023
        "oklab-function": true, // Baseline: Newly available since 5/2023
        "relative-color-syntax": true, // Baseline: Limited availability
      },
    },
  ),
  // Enables to control dark theme via a class
  darkThemeClass({
    where: true,
  }),
]

export default {
  plugins,
}
