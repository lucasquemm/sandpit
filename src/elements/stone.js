import * as element from '../element'

const NAME = 'STONE'

const make = () => element.make({ type: NAME, color: [0, 0, 60, 40] })

const update = (x, y, sandpit) => {}

export { NAME, make, update, COLOR }
