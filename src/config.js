export const defaultConfig = {
  prefix: "",
  rootSelector: ":where(html)",
  layoutHelpers: [
    "container",
    "grid",
    "auto-grid",
    "flow",
    "center",
    "stack",
    "cluster",
    "switcher",
  ],
  grid: {
    columns: 12,
    gutterSize: "4-6",
    gridGapSpace: "6",
    gridColumnSpace: "7",
  },
  fluid: {
    minWidth: 320,
    maxWidth: 1240,
    baseFontSize: 16,
    baseMin: 18,
    baseMax: 20,
    scaleMin: 1.2,
    scaleMax: 1.25,
  },
  fontSize: [-2, -1, 0, 1, 2, 3, 4, 5],
  space: [
    // Single steps
    ["1", 0.25], // 3xs
    ["2", 0.5], // 2xs
    ["3", 0.75], // xs
    ["4", 1], // s
    ["5", 1.5], // m
    ["6", 2], // l
    ["7", 3], // xl
    ["8", 4], // 2xl
    ["9", 6], // 3xl

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
    ["4-6", 0],
  ],

  // From Open Props
  inlineSize: [
    "size-content-1",
    "size-content-2",
    "size-content-3",
    "size-header-1",
    "size-header-2",
    "size-header-3",
  ],
  borderRadius: ["radius-2", "radius-round"],
  borderSize: ["border-size-1"],
  colors: [
    "gray-1",
    "gray-2",
    "gray-3",
    "gray-4",
    "gray-5",
    "gray-6",
    "gray-7",
    "gray-8",
    "gray-9",
    "gray-10",
    "gray-11",
    "gray-12",
  ],
  lineHeight: [
    "font-lineheight-0",
    "font-lineheight-1",
    "font-lineheight-2",
    "font-lineheight-3",
    "font-lineheight-4",
  ],
  fontWeight: [
    "font-weight-3",
    "font-weight-4",
    "font-weight-5",
    "font-weight-6",
    "font-weight-7",
  ],
}
