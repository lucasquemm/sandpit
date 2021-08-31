import { EMPTY } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'
import * as fire from './fire'

const BASE_COLOR = [20, 64, 55, 50]

const NAME = 'LAVA'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: BASE_COLOR,
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case EMPTY:
      sandpit.move(0, 1)
      break
    case NAME:
      if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, 1)
      }
      break
  }

  if (chance(0.5) && sandpit.is(cell.direction, 0, EMPTY)) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005) && sandpit.is(0, -1, EMPTY)) {
    sandpit.set(0, -1, fire.make())
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    if (sandpit.get(nx, ny).flammable) {
      sandpit.set(nx, ny, fire.make('blaze'))
    }
  }
}

export { NAME, make, update, BASE_COLOR }
