import * as element from '../element'

const BASE_COLOR = [0, 0, 60, 40]

const NAME = 'STONE'

const make = () => element.make({ type: NAME, solid: true, color: 0x999999 })

export { NAME, make, BASE_COLOR }
