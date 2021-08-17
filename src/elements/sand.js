import * as air from './air'
import * as element from '../element'

const NAME = 'SAND'

const make = () => element.make({ type: NAME, color: [46, 78, 75, 50] })

const update = (x, y, world) => {
  if (world.is(x, y + 1, air.NAME)) {
    world.move(x, y, 0, 1)
  }
}

export { NAME, make, update, COLOR }
