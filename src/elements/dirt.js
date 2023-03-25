import * as element from '../element'
import powder from '../traits/powder'

const color = 0x482d09
const NAME = 'DIRT'

const make = () =>
  element.make({
    type: NAME,
    color,
    solid: true,
  })

const update = (sandpit, cell) => {
  powder(sandpit, NAME, cell, { clumpiness: 0.01 })
}

export { NAME, make, update, color }
