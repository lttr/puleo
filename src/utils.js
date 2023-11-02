export function customProperty(prefix, name, value) {
  return `--${prefix}${name}: ${value};`
}
