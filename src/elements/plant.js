import { empty, EMPTY } from './empty'
import * as element from '../element'
import { chance, pickRand, randInt } from '../random'
import { WATER } from './water'

const color = 0x199f1d
const PLANT = 'PLANT'

const make = (energy) => {
  const isStem = chance(0.1)

  return element.make({
    type: PLANT,
    kind: isStem ? 'stem' : 'bud',
    flammability: 0.8,
    energy:
      energy !== undefined ? energy : isStem ? randInt(10, 15) : randInt(1, 5),
    direction: [pickRand([1, 0, -1]), -1],
    color,
    solid: true,
  })
}

const update = (sandpit, cell) => {
  const [dx, dy] = cell.direction
  const above = sandpit.get(dx, dy)
  const canGrow = above.type === EMPTY || above.type === WATER

  if (canGrow) {
    if (chance(0.2) && cell.energy > 0) {
      cell.energy--
      sandpit.set(dx, dy, make(cell.energy))
    }
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    if (chance(0.05) && sandpit.is(nx, ny, WATER)) {
      sandpit.set(nx, ny, empty())
      sandpit.set(dx, dy, make(cell.energy))
    }
  }
}

export { PLANT, make, update, color }
