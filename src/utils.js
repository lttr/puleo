export function customProperty(propsPrefix, name, value) {
  return `--${propsPrefix}${name}: ${value};`
}
