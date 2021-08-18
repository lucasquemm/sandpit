import * as air from './air'
import * as element from '../element'
import { pickRand } from '../random'
const NAME = 'WATER'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: [216, 65, 60, 50],
  })

const update = (x, y, world, cell) => {
  if (world.is(x, y + 1, air.NAME)) {
    world.replace(x, y, 0, 1)
  } else if (world.is(x + cell.direction, y, air.NAME)) {
    world.replace(x, y, cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update }
