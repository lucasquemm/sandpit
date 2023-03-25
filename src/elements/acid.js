import * as element from '../element'

import { EMPTY, empty } from './empty'

import { chance, pickRand } from '../random'

const color = 0xa7eb33

const corrodeChance = 0.01

const ACID = 'ACID'
const make = () =>
  element.make({
    type: ACID,
    liquid: true,
    direction: pickRand([1, -1]),
    color,
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case EMPTY:
      sandpit.move(0, 1)
      break
    case ACID:
      if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, 1)
      }
      break
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    const nbr = sandpit.get(nx, ny)
    if (nbr.type !== 'BOUNDS' && nbr.type !== ACID && nbr.type != EMPTY) {
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

export { ACID, make, update, color }
