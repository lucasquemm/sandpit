import * as air from './air'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'WATER'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: [216, 65, 60, 50],
  })

const update = (x, y, world, cell) => {
  const below = world.get(x, y + 1)

  switch (below.type) {
    case air.NAME:
      world.move(x, y, 0, 1)
      break
    case NAME:
      if (world.is(x + cell.direction, y + 1, air.NAME)) {
        world.move(x, y, cell.direction, 1)
      }
      break
  }

  if (world.is(x + cell.direction, y, air.NAME)) {
    world.move(x, y, cell.direction, 0)
  } else {
    cell.direction *= -1
  }
  if (chance(0.005)) {
    element.updateColor(cell)
  }
}

export { NAME, make, update }
