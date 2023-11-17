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
      autoprefixer: true, // Default true, double check when using older Edge versions
      features: {
        "color-function": true,
        "color-mix": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
        "nesting-rules": true,
        "oklab-function": true,
        "relative-color-syntax": true,
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
