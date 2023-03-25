import * as element from '../element'

const color = 0x999999
const NAME = 'STONE'

const make = () => element.make({ type: NAME, solid: true, color })

export { NAME, make, color }
