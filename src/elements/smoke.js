import * as water from './water'
import * as slime from './slime'
import * as sand from './sand'
import * as oil from './oil'
import * as lava from './lava'
import * as gunpowder from './gunpowder'
import { EMPTY, empty } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'

const BASE_COLOR = [4, 2, 79, 90]

const NAME = 'SMOKE'
const despawnChance = 0.015
const chanceOfGoingStraight = 0.95
const chanceOfSpread = 0.5

const make = () =>
  element.make({
    type: NAME,
    hexColor: 0xcbc9c8,
    direction: pickRand([1, -1]),
  })

const update = (sandpit, cell) => {
  const above = sandpit.get(0, -1)

  if (chance(despawnChance)) {
    sandpit.set(0, 0, empty())
  }

  switch (above.type) {
    case EMPTY:
      if (chance(chanceOfGoingStraight)) {
        sandpit.move(0, -1)
      } else if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, -1)
      }
      break
    case gunpowder.NAME:
    case lava.NAME:
    case oil.NAME:
    case sand.NAME:
    case slime.NAME:
    case water.NAME:
      sandpit.swap(0, -1)
      break
  }

  if (chance(chanceOfSpread) && sandpit.is(cell.direction, 0, EMPTY)) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update, BASE_COLOR }
