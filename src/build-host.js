import { build } from "./build.js"

// Generate CSS with :host selector instead of :root
build({
  rootSelector: ":host",
})
