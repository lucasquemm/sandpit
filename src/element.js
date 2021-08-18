const rand = (max, min = 0) => Math.random() * (max - min) + min

const make = ({ type, color, ...meta }) => ({
  type,
  clock: 0,
  colorInput: color,
  color: createColor(color),
  ...meta,
})

const createColor = (color) =>
  `hsl(${color[0]}deg ${color[1]}% ${rand(color[2], color[3])}%)`

const updateColor = (cell) => {
  cell.color = createColor(cell.colorInput)
}

export { make, updateColor }
