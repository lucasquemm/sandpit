import * as air from './air'
import * as water from './water'
import * as wood from './wood'
import * as smoke from './smoke'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'FIRE'
const despawnChance = 0.2
const chanceOfGoingStraight = 0.73
const chanceOfSpread = 0.75
const ignitingChance = 0.6
const burningChance = 0.003

const make = (burning = false) =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color: pickRand([
      [9, 80, 35, 50],
      [7, 80, 48, 58],
      [35, 80, 50, 60],
      [7, 85, 36, 45],
    ]),
    burning: burning,
  })

const burn = (x, y, world, cell) => {
  let isBurning = false
  const neighbors = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x - 2, y - 2],
    [x - 2, y],
    [x - 2, y + 2],
    [x, y - 2],
    [x, y + 2],
    [x + 2, y - 2],
    [x + 2, y],
    [x + 2, y + 2],
  ]

  for (let [nx, ny] of neighbors) {
    if (
      chance(cell.burning ? burningChance : ignitingChance) &&
      world.is(nx, ny, wood.NAME)
    ) {
      world.set(nx, ny, make(true))
      isBurning = true
    }
  }
  return isBurning
}

const update = (x, y, world, cell) => {
  const above = world.get(x, y - 1)

  const isBurning = burn(x, y, world, cell)

  if (cell.burning) {
    if (chance(0.01)) {
      world.set(x, y, smoke.make())
      return
    }
  }

  if (!isBurning && chance(despawnChance)) {
    world.set(x, y, air.make())
  }
  switch (above.type) {
    case air.NAME:
      if (chance(chanceOfGoingStraight)) {
        world.move(x, y, 0, -1)
      } else if (world.is(x + cell.direction, y - 1, air.NAME)) {
        world.move(x, y, cell.direction, -1)
      }
      break
  }

  if (chance(chanceOfSpread) && world.is(x + cell.direction, y, air.NAME)) {
    world.move(x, y, cell.direction, 0)
  } else {
    cell.direction *= -1
  }
}

export { NAME, make, update, COLOR }
