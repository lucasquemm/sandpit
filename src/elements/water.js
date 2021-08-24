import { EMPTY } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'WATER'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: [216, 65, 60, 50],
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

  if (sandpit.is(cell.direction, 0, EMPTY)) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005)) {
    element.updateColor(cell)
  }
}

export { NAME, make, update }
