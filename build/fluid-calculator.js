export function calculate() {
  const MIN_WIDTH = 320
  const MAX_WIDTH = 1240

  const BASE_FONT_SIZE = 18

  const BASE_MIN = 18
  const BASE_MAX = 20

  const SCALE_MIN = 1.2
  const SCALE_MAX = 1.25

  function fluid(minSize, maxSize, minWidth = MIN_WIDTH, maxWidth = MAX_WIDTH) {
    const slope = (maxSize - minSize) / (maxWidth - minWidth)
    const yAxisIntersection = -minWidth * slope + minSize

    const minRems = (minSize / BASE_FONT_SIZE).toFixed(3)
    const preferredRems = (yAxisIntersection / BASE_FONT_SIZE).toFixed(2)
    const preferredVws = (slope * 100).toFixed(2)
    const maxRems = (maxSize / BASE_FONT_SIZE).toFixed(3)
    return `clamp(${minRems}rem, ${preferredRems}rem + ${preferredVws}vw, ${maxRems}rem)`
  }

  const steps = [-2, -1, 0, 1, 2, 3, 4, 5]

  for (const step of steps) {
    const min = BASE_MIN * Math.pow(SCALE_MIN, step)
    const max = BASE_MAX * Math.pow(SCALE_MAX, step)
    const ruleValue = fluid(min, max)
    const ruleName = `font-size-${step} `
    const rule = `--${ruleName}: ${ruleValue}; `
    const comment = `/* ${min.toFixed(1)}px => ${max.toFixed(1)}px */`
    console.log(comment)
    console.log(rule)
    console.log()
  }

  const spaces = [
    // Single steps
    ["1", 0.25],
    ["2", 0.5],
    ["3", 0.75],
    ["4", 1],
    ["5", 1.5],
    ["6", 2],
    ["7", 3],
    ["8", 4],
    ["9", 6],

    // One up steps
    ["1-2", 0],
    ["2-3", 0],
    ["3-4", 0],
    ["4-5", 0],
    ["5-6", 0],
    ["6-7", 0],
    ["7-8", 0],
    ["8-9", 0],

    // Two up steps
    ["3-5", 0],
    ["4-5", 0],
  ]

  const spacesMap = Object.fromEntries(spaces)

  for (const space of spaces) {
    const [name, multiplier] = space
    let minMultiplier = multiplier
    let maxMultiplier = multiplier
    if (name.includes("-")) {
      const [nameStart, nameEnd] = name.split("-")
      minMultiplier = spacesMap[nameStart]
      maxMultiplier = spacesMap[nameEnd]
    }
    const min = BASE_MIN * minMultiplier
    const max = BASE_MAX * maxMultiplier
    const ruleValue = fluid(min, max)
    const ruleName = `space-${name} `
    const rule = `--${ruleName}: ${ruleValue}; `
    const comment = `/* ${min.toFixed(1)}px => ${max.toFixed(1)}px */`
    console.log(comment)
    console.log(rule)
    console.log()
  }

  const gridMaxWidth =
    (13 * spacesMap["6"] * BASE_MAX + spacesMap["7"] * BASE_MAX * 12) /
    BASE_FONT_SIZE
  console.log(`--grid-max-width: ${gridMaxWidth.toFixed(2)}rem;`)
  console.log(`--grid-gutter: var(--space-3-5);`)
}
