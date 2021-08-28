import { empty, EMPTY } from './empty'
import * as water from './water'
import * as element from '../element'
import { chance, pickRand, randInt } from '../random'

const NAME = 'PLANT'

const make = (energy = randInt(10, 20)) =>
  element.make({
    type: NAME,
    energy,
    direction: [pickRand([1, -1]), pickRand([1, -1])],
    color: [122, 73, 36, 30],
  })

const update = (sandpit, cell) => {
  const [dx, dy] = cell.direction

  if (sandpit.is(dx, dy, EMPTY)) {
    if (chance(0.2) && cell.energy > 0) {
      cell.energy--
      sandpit.set(dx, dy, make(cell.energy))
    }
  }

  for (let [nx, ny] of sandpit.neighbors(1)) {
    if (chance(0.05) && sandpit.is(nx, ny, water.NAME)) {
      sandpit.set(nx, ny, empty())
      sandpit.set(dx, dy, make(cell.energy))
    }
  }
}

export { NAME, make, update }
