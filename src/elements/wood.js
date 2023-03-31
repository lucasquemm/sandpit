import * as element from '../element'

const color = 0x6c502d
const WOOD = 'WOOD'

const make = () =>
  element.make({
    type: WOOD,
    color: 0x6c502d,
    flammability: 0.2,
    solid: true,
  })

export { WOOD, make, color }
