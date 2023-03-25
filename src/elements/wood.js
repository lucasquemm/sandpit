import * as element from '../element'

const color = 0x6c502d
const NAME = 'WOOD'

const make = () =>
  element.make({
    type: NAME,
    color: 0x6c502d,
    flammability: 0.2,
    solid: true,
  })

export { NAME, make, color }
