import * as element from '../element'
import powder from '../traits/powder'

const color = 0x482d09
const DIRT = 'DIRT'

const make = () =>
  element.make({
    type: DIRT,
    color,
    solid: true,
    alphaMode: 'normal',
  })

const update = (sandpit, cell) => {
  powder(sandpit, DIRT, cell, { clumpiness: 0.01 })
}

export { DIRT, make, update, color }
