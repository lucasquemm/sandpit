import * as element from '../element'

const NAME = 'WOOD'

const make = () => element.make({ type: NAME, color: [33, 41, 30, 15] })

const update = (x, y, world) => {}

export { NAME, make, update, COLOR }
