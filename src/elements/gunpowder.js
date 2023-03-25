import * as element from '../element'
import powder from '../traits/powder'

const BASE_COLOR = [44, 0, 34, 25]

const NAME = 'GUNPOWDER'

const make = () =>
  element.make({
    type: NAME,
    flammability: 0.5,
    solid: true,
    explosive: { ratio: 0.1, minRadius: 5, maxRadius: 10 },
    color: 0x575757,
  })

const update = (sandpit, cell) => {
  powder(sandpit, NAME, cell)
}

export { NAME, make, update, BASE_COLOR }
