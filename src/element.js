import noise from './noise'
import { rand } from './random'

let xoff = 0

const make = ({ type, color, ...meta }) => ({
  type,
  clock: 0,
  alpha: rand(1, 0.9),
  color,
  r0: noise((xoff += 0.001)),
  r1: rand(1, 0.9),
  ...meta,
})

const setColor = (color, cell) => {
  cell.color = color
}

const refreshColor = (cell) => {
  cell.alpha = rand(1, 0.9)
  cell.r0 = noise((xoff += 0.001))
  cell.r1 = rand(1, 0.9)
}

export { make, refreshColor, setColor }
