import { EMPTY } from './empty'
import * as element from '../element'
import * as fire from './fire'
import * as water from './water'
import { chance, pickRand } from '../random'

const NAME = 'OIL'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: [25, 59, 41, 48],
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case fire.NAME:
    case EMPTY:
      sandpit.move(0, 1)
      break
    case NAME:
      if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, 1)
      }
      break
    case water.NAME:
      if (sandpit.is(cell.direction, -1, water.NAME)) {
        sandpit.swap(cell.direction, -1)
      }
      break
  }

  if (sandpit.is(cell.direction, 0, EMPTY)) {
    sandpit.move(cell.direction, 0)
  } else if (chance(0.5) && sandpit.is(cell.direction, 0, water.NAME)) {
    sandpit.swap(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { NAME, make, update }
