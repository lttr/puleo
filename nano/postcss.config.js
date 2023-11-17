import cssnano from "cssnano"

import config from "../postcss.config.js"

export default {
  plugins: [
    ...config.plugins,
    cssnano({
      preset: "default",
    }),
  ],
}
