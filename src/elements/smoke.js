import * as air from './air'
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

const update = (x, y, world, cell) => {
  const above = world.get(x, y - 1)

  if (chance(despawnChance)) {
    world.move(x, y, 0, 0)
  }

  switch (above.type) {
    case air.NAME:
      if (chance(chanceToNotZigZag)) {
        world.move(x, y, 0, -1)
      } else if (world.is(x + cell.direction, y - 1, air.NAME)) {
        world.move(x, y, cell.direction, -1)
      }
  }

  if (chance(chanceOfSpread) && world.is(x + cell.direction, y, air.NAME)) {
    world.move(x, y, cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update }
