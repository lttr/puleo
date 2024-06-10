import { openProps } from "./open-props.js"

export function handleShadows(names, propsPrefix) {
  const prerequisites = [
    "shadow-color",
    "shadow-strength",
    "inner-shadow-highlight",
    "shadow-color-@media:dark",
    "shadow-strength-@media:dark",
    "inner-shadow-highlight-@media:dark",
  ]
  return [
    ...openProps({ propsPrefix, names: prerequisites }),
    ...openProps({ propsPrefix, names }),
  ]
}
