import { customProperty } from "./utils.js"

export function fluidFontSize({
  propsPrefix,
  baseFontSize,
  baseMax,
  baseMin,
  fontSize: steps,
  maxWidth,
  minWidth,
  scaleMax,
  scaleMin,
}) {
  const result = []
  for (const step of steps) {
    const min = baseMin * Math.pow(scaleMin, step)
    const max = baseMax * Math.pow(scaleMax, step)
    const ruleValue = fluid({
      baseFontSize,
      maxSize: max,
      maxWidth,
      minSize: min,
      minWidth,
    })
    const rule = customProperty(propsPrefix, `font-size-${step}`, ruleValue)
    const comment = `/* ${min.toFixed(1)}px => ${max.toFixed(1)}px */`

    result.push([comment, rule])
  }
  return result.flat()
}

export function fluidSpace({
  propsPrefix,
  baseFontSize,
  baseMax,
  baseMin,
  maxWidth,
  minWidth,
  space: spaces,
}) {
  const spacesMap = Object.fromEntries(spaces)
  const result = []

  for (const space of spaces) {
    const [name, multiplier] = space
    let minMultiplier = multiplier
    let maxMultiplier = multiplier
    if (name.includes("-")) {
      const [nameStart, nameEnd] = name.split("-")
      minMultiplier = spacesMap[nameStart]
      maxMultiplier = spacesMap[nameEnd]
    }
    const min = baseMin * minMultiplier
    const max = baseMax * maxMultiplier
    const ruleValue = fluid({
      baseFontSize,
      maxSize: max,
      maxWidth,
      minSize: min,
      minWidth,
    })
    const rule = customProperty(propsPrefix, `space-${name}`, ruleValue)
    const comment = `/* ${min.toFixed(1)}px => ${max.toFixed(1)}px */`

    result.push([comment, rule])
  }
  return result.flat()
}

export function fluidGrid({
  propsPrefix,
  baseFontSize,
  baseMax,
  columns,
  gridColumnSpace,
  gridGapSpace,
  gutterSize,
  space,
}) {
  const spacesMap = Object.fromEntries(space)
  const gridColumnSpaceMultiplier = spacesMap[gridColumnSpace]
  const gridGapSpaceMultiplier = spacesMap[gridGapSpace]

  const gridMaxWidth =
    ((columns + 1) * gridGapSpaceMultiplier * baseMax +
      gridColumnSpaceMultiplier * baseMax * columns) /
    baseFontSize

  return [
    customProperty(
      propsPrefix,
      "grid-max-width",
      `${gridMaxWidth.toFixed(2)}rem`,
    ),
    customProperty(
      propsPrefix,
      "grid-gutter",
      `var(--${propsPrefix}space-${gutterSize})`,
    ),
    customProperty(propsPrefix, "grid-columns", 12),
  ]
}

/**
 * Based on: https://github.com/heybokeh/pollen/blob/main/src/utils/index.ts
 */
function fluid({ baseFontSize, maxSize, maxWidth, minSize, minWidth }) {
  const slope = (maxSize - minSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minSize

  const minRems = (minSize / baseFontSize).toFixed(3)
  const preferredRems = (yAxisIntersection / baseFontSize).toFixed(2)
  const preferredVws = (slope * 100).toFixed(2)
  const maxRems = (maxSize / baseFontSize).toFixed(3)

  return `clamp(${minRems}rem, ${preferredRems}rem + ${preferredVws}vw, ${maxRems}rem)`
}
