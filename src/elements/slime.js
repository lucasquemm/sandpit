import { EMPTY, empty } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'
import { WATER } from './water'
import { OIL } from './oil'

const color = 0xb6f6c1
const SLIME = 'SLIME'

const make = ({ drip = false } = {}) =>
  element.make({
    type: SLIME,
    drip,
    direction: pickRand([1, -1]),
    color: 0xb6f6c1,
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  if (cell.drip) {
    let despawnChance = 0.01

    if (below.type !== EMPTY) despawnChance = 0.5

    if (chance(despawnChance)) sandpit.set(0, 0, empty())
  }

  let unstuckChance = 1

  for (let n of [
    [0, -1],
    [0, 1],
    [1, 1],
    [-1, 1],
    [1, 0],
    [-1, 0],
  ]) {
    const nbr = sandpit.get(...n)

    if (nbr.type === WATER && chance(0.01)) {
      nbr.slimey = true
      sandpit.set(0, 0, empty())
      return
    }

    if (nbr.type !== SLIME && nbr.solid) unstuckChance -= 0.5
    else if (nbr.type !== EMPTY) unstuckChance -= 0.2
  }

  const unstuck = chance(unstuckChance)

  cell.solid = !unstuck
  cell.liquid = unstuck

  switch (below.type) {
    case EMPTY:
      if (unstuck) {
        sandpit.move(0, 1)
      } else if (chance(0.001) && sandpit.get(0, -1).solid) {
        sandpit.set(0, 1, make({ drip: true }))
      }

      break
    case OIL:
      sandpit.swap(0, 1)
      break
    case WATER:
      if (chance(0.05)) sandpit.set(0, 0, empty())
      else sandpit.swap(0, 1)

      break
    case SLIME:
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

export { SLIME, make, update, color }
