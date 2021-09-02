import { empty, EMPTY } from './empty'
import * as water from './water'
import * as element from '../element'
import { chance, pickRand, randInt } from '../random'

const BASE_COLOR = [122, 73, 36, 25]

const NAME = 'PLANT'

const make = (energy, color = BASE_COLOR) => {
  const isStem = chance(0.1)

  return element.make({
    type: NAME,
    kind: isStem ? 'stem' : 'bud',
    flammable: true,
    energy:
      energy !== undefined ? energy : isStem ? randInt(10, 15) : randInt(1, 5),
    direction: [pickRand([1, 0, -1]), -1],
    color,
    hexColor: 0x199f1d,
  })
}

const update = (sandpit, cell) => {
  const [dx, dy] = cell.direction
  const above = sandpit.get(dx, dy)
  const canGrow = above.type === EMPTY || above.type === water.NAME

  if (canGrow) {
    if (chance(0.2) && cell.energy > 0) {
      cell.energy--
      sandpit.set(dx, dy, make(cell.energy))
    }
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    if (chance(0.05) && sandpit.is(nx, ny, water.NAME)) {
      sandpit.set(nx, ny, empty())
      sandpit.set(dx, dy, make(cell.energy))
    }
  }
}

export { NAME, make, update, BASE_COLOR }
