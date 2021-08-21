import * as air from './air'
import * as water from './water'
import * as element from '../element'
import { pickRand } from '../random'

const NAME = 'SAND'

const make = () => element.make({ type: NAME, color: [46, 78, 75, 50] })

const update = (x, y, world) => {
  const below = world.get(x, y + 1)
  const direction = pickRand([1, -1])

  switch (below.type) {
    case air.NAME:
      world.move(x, y, 0, 1)
      break
    case water.NAME:
      world.swap(x, y, 0, 1)
      break
    case NAME:
      if (world.is(x + direction, y + 1, air.NAME)) {
        world.move(x, y, direction, 1)
      }
      break
  }
}

export { NAME, make, update, COLOR }
