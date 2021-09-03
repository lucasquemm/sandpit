import { rand } from './random'

const make = ({ type, color, ...meta }) => ({
  type,
  clock: 0,
  colorInput: color,
  alpha: rand(1, 0.9),
  ...meta,
})

const setColor = (color, cell) => {
  cell.hexColor = color
}

const refreshColor = (cell) => {
  cell.alpha = rand(1, 0.9)
}

export { make, refreshColor, setColor }
