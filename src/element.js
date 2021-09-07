import { rand } from './random'

const make = ({ type, color, ...meta }) => ({
  type,
  clock: 0,
  colorInput: color,
  alpha: rand(1, 0.9),
  color,
  ...meta,
})

const setColor = (color, cell) => {
  cell.color = color
}

const refreshColor = (cell) => {
  cell.alpha = rand(1, 0.9)
  cell.color = cell.colorInput
}

export { make, refreshColor, setColor }
