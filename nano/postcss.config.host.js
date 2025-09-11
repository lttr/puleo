import cssnano from "cssnano"

import config from "../postcss.config.host.js"

export default {
  plugins: [
    ...config.plugins,
    cssnano({
      preset: "default",
    }),
  ],
}
