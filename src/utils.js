export function customProperty(propsPrefix, name, value) {
  return `--${propsPrefix}${name}: ${value};`
}

export function createWhere(useWhere) {
  return (selector) => (useWhere ? `:where(${selector})` : selector)
}

export function where(useWhere, selector) {
  return useWhere ? `:where(${selector})` : selector
}

export function createRootSelector(useWhere, rootSelector) {
  return where(useWhere, rootSelector)
}

// Tagged template literal for CSS - improves syntax highlighting and formatting
export function css(strings, ...values) {
  const result = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || "")
  }, "")

  // Split into lines without trimming first (to preserve indentation info)
  const lines = result.split("\n")

  // Remove leading and trailing empty lines
  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift()
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop()
  }

  // Find minimum indentation (excluding empty lines)
  const minIndent = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => {
      const leadingSpaces = line.match(/^(\s*)/)[1].length
      return Math.min(min, leadingSpaces)
    }, Infinity)

  // Handle case where all lines were filtered out
  const indentToRemove = minIndent === Infinity ? 0 : minIndent

  // Remove the minimum indentation from all lines
  const dedented = lines.map((line) => line.slice(indentToRemove)).join("\n")

  return dedented
}
