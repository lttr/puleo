import OpenProps from "open-props"
import { customProperty } from "./utils.js"

export function openProps({ prefix, names }) {
  const result = []
  for (const name of names) {
    const rule = customProperty(prefix, `${name}`, OpenProps[`--${name}`])
    result.push(rule)
  }
  return result
}
