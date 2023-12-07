import OpenProps from "open-props"
import { customProperty } from "./utils.js"

export function openProps({ propsPrefix, names }) {
  const result = []
  for (const name of names) {
    const rule = customProperty(propsPrefix, `${name}`, OpenProps[`--${name}`])
    result.push(rule)
  }
  return result
}
