export function customProperty(propsPrefix, name, value) {
  return `--${propsPrefix}${name}: ${value};`
}

export function constructRootSelector(useWhere, rootSelector) {
  return useWhere ? `:where(${rootSelector})` : rootSelector
}
