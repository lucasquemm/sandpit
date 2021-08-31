import * as element from '../element'

const BASE_COLOR = [33, 41, 30, 15]

const NAME = 'WOOD'

const make = () =>
  element.make({ type: NAME, flammable: true, color: BASE_COLOR })

export { NAME, make, BASE_COLOR }
