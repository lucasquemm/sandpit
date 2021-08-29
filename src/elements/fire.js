import { EMPTY, empty } from './empty'
import * as wood from './wood'
import * as smoke from './smoke'
import * as oil from './oil'
import * as plant from './plant'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'FIRE'
const despawnChance = 0.2
const chanceOfGoingStraight = 0.73
const chanceOfSpread = 0.75
const ignitingChance = 1
const burningChance = 0.01

const extinguishChance = 0.01
const looseFlameChance = 0.06

const orange1 = [35, 76, 62, 72]
const orange2 = [35, 79, 67, 77]
const red1 = [7, 82, 56, 66]
const red2 = [7, 82, 49, 59]
const red3 = [7, 87, 33, 43]

const make = (phase = 'spark') =>
  element.make({
    type: NAME,
    phase,
    direction: pickRand([1, -1]),
    color: pickRand([orange1, orange2, red1, red2, red3]),
  })

const ignite = (sandpit) => {
  let igniteTarget

  for (let [nx, ny] of sandpit.neighbors1) {
    if (
      chance(ignitingChance) &&
      (sandpit.is(nx, ny, wood.NAME) ||
        sandpit.is(nx, ny, oil.NAME) ||
        sandpit.is(nx, ny, plant.NAME))
    ) {
      igniteTarget = [nx, ny]
      break
    }
  }

  if (igniteTarget) {
    sandpit.set(...igniteTarget, make('blaze'))
    sandpit.set(0, 0, empty())
  }
}

const burn = (sandpit, spreadChance) => {
  let burnTarget

  for (let [nx, ny] of sandpit.neighbors2) {
    if (
      chance(spreadChance) &&
      (sandpit.is(nx, ny, wood.NAME) ||
        sandpit.is(nx, ny, oil.NAME) ||
        sandpit.is(nx, ny, plant.NAME))
    ) {
      burnTarget = [nx, ny]
      break
    }
  }
  if (burnTarget) sandpit.set(...burnTarget, make('blaze'))
}

const update = (sandpit, cell) => {
  switch (cell.phase) {
    case 'spark':
      if (chance(despawnChance)) {
        sandpit.set(0, 0, empty())
      }

      if (chance(chanceOfGoingStraight) && sandpit.is(0, -1, EMPTY)) {
        sandpit.move(0, -1)
      } else if (sandpit.is(cell.direction, -1, EMPTY)) {
        sandpit.move(cell.direction, -1)
      }

      if (chance(chanceOfSpread) && sandpit.is(cell.direction, 0, EMPTY)) {
        sandpit.move(cell.direction, 0)
      } else {
        cell.direction *= -1
      }

      ignite(sandpit)
      break
    case 'blaze':
      burn(sandpit, burningChance)

      if (chance(extinguishChance)) {
        sandpit.set(0, 0, smoke.make())
        return
      } else if (sandpit.is(0, -1, EMPTY)) {
        if (chance(looseFlameChance)) {
          sandpit.set(0, -1, make())
        } else if (chance(0.15)) {
          sandpit.set(0, -1, smoke.make())
        }
      }

      let noNeighbors = true

      for (let [nx, ny] of sandpit.neighbors1) {
        if (!sandpit.is(nx, ny, EMPTY)) {
          noNeighbors = false
          break
        }
      }
      if (noNeighbors) {
        sandpit.set(0, 0, empty())
      }
      break
  }
}

export { NAME, make, update }
