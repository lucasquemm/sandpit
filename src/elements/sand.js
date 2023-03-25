import * as element from '../element'
import powder from '../traits/powder'

const color = 0xf1da8e
const SAND = 'SAND'

const make = () =>
  element.make({
    type: SAND,
    color,
    solid: true,
  })

const update = (sandpit, cell) => {
  powder(sandpit, SAND, cell)
}

export { SAND, make, update, color }
