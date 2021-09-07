import * as element from '../element'

import { EMPTY, empty } from './empty'

import { chance, pickRand } from '../random'

const BASE_COLOR = [82, 82, 56, 47]

const corrodeChance = 0.01

const NAME = 'ACID'
const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: 0xa7eb33,
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

  for (let [nx, ny] of sandpit.neighbors1) {
    const nbr = sandpit.get(nx, ny)
    if (nbr.type !== 'BOUNDS' && nbr.type !== NAME && nbr.type != EMPTY) {
      if (chance(corrodeChance)) {
        sandpit.set(nx, ny, empty())
        sandpit.set(0, 0, empty())
      }
    }
  }

  if (sandpit.is(cell.direction, 0, EMPTY)) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { NAME, make, update, BASE_COLOR }
