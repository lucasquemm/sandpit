import noise from './noise'
import { rand } from './random'

let r1off = 0
let r2off = 0

const make = ({ type, color, alphaMode = 'normal', ...meta }) => ({
  type,
  clock: 0,
  color,
  r0: rand(1, 0.9),
  r1: noise((r1off += 0.001)),
  r2: noise((r2off += 0.01)),
  alphaMode,
  ...meta,
})

const setColor = (color, cell) => {
  cell.color = color
}

const refreshColor = (cell) => {
  cell.r0 = rand(1, 0.9)
  cell.r1 = noise((r1off += 0.001))
  cell.r2 = noise((r2off += 0.0001))
}

export { make, refreshColor, setColor }
