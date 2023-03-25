import * as element from '../element'
import powder from '../traits/powder'

const BASE_COLOR = [46, 78, 75, 50]

const NAME = 'DIRT'

const make = () =>
  element.make({
    type: NAME,
    color: 0x482d09,
    solid: true,
  })

const update = (sandpit, cell) => {
  powder(sandpit, NAME, cell, { clumpiness: 0.01 })
}

export { NAME, make, update, BASE_COLOR }
