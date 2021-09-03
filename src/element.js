import { rand } from './random'

const make = ({ type, hexColor, ...meta }) => ({
  type,
  clock: 0,
  colorInput: hexColor,
  alpha: rand(1, 0.9),
  hexColor,
  ...meta,
})

const setColor = (color, cell) => {
  cell.hexColor = color
}

const refreshColor = (cell) => {
  cell.alpha = rand(1, 0.9)
  cell.hexColor = cell.colorInput
}

export { make, refreshColor, setColor }
