import * as air from './air'
import * as water from './water'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'SMOKE'
const despawnChance = 0.015
const chanceOfGoingStraight = 0.95
const chanceOfSpread = 0.5

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: [4, 2, 79, 90],
  })

const update = (sandpit, cell) => {
  const above = sandpit.get(0, -1)

  if (chance(despawnChance)) {
    sandpit.move(0, 0)
  }

  switch (above.type) {
    case air.NAME:
      if (chance(chanceOfGoingStraight)) {
        sandpit.move(0, -1)
      } else if (sandpit.is(cell.direction, 1, air.NAME)) {
        sandpit.move(cell.direction, -1)
      }
      break
    case water.NAME:
      sandpit.move(0, -1)
      break
  }

  if (chance(chanceOfSpread) && sandpit.is(cell.direction, 0, air.NAME)) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update }
