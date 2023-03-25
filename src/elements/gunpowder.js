import * as element from '../element'
import powder from '../traits/powder'

const color = 0x575757
const GUNPOWDER = 'GUNPOWDER'

const make = () =>
  element.make({
    type: GUNPOWDER,
    flammability: 0.5,
    solid: true,
    explosive: { ratio: 0.1, minRadius: 5, maxRadius: 10 },
    color,
  })

const update = (sandpit, cell) => {
  powder(sandpit, GUNPOWDER, cell)
}

export { GUNPOWDER, make, update, color }
