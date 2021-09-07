import { EMPTY, empty } from './empty'
import * as water from './water'
import * as oil from './oil'
import * as element from '../element'
import { chance, pickRand } from '../random'

const BASE_COLOR = [130, 79, 84, 80]

const NAME = 'SLIME'

const make = () =>
  element.make({
    type: NAME,
    drip: [],
    direction: pickRand([1, -1]),
    color: 0xb6f6c1,
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  let neighborCount = 0

  for (let n of sandpit.neighbors1) {
    const nbr = sandpit.get(...n)

    if (nbr.type === water.NAME && chance(0.01)) {
      nbr.slimey = true
      sandpit.set(0, 0, empty())
      return
    }

    if (nbr.type !== EMPTY) neighborCount++
  }

  const unstuck = chance((5 - neighborCount) / 5)

  switch (below.type) {
    case EMPTY:
      if (unstuck) {
        sandpit.move(0, 1)
      }

      break
    case oil.NAME:
      sandpit.swap(0, 1)
      break
    case water.NAME:
      if (chance(0.05)) sandpit.set(0, 0, empty())
      else sandpit.swap(0, 1)

      break
    case NAME:
      if (unstuck && sandpit.is(direction, 1, EMPTY)) {
        sandpit.move(direction, 1)
      }
      break
  }

  if (sandpit.is(cell.direction, 0, EMPTY)) {
    if (unstuck) sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update, BASE_COLOR }
