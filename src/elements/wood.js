import * as element from '../element'

const BASE_COLOR = [33, 41, 30, 15]

const NAME = 'WOOD'

const make = () =>
  element.make({
    type: NAME,
    color: 0x6c502d,
    flammable: true,
  })

export { NAME, make, BASE_COLOR }
