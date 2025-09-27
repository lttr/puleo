import cssnano from "cssnano"

import config from "../root/postcss.config.js"

export default {
  plugins: [
    ...config.plugins,
    cssnano({
      preset: "default",
    }),
  ],
}
