import { EMPTY, empty } from './empty'
import * as water from './water'
import * as wood from './wood'
import * as smoke from './smoke'
import * as element from '../element'
import { chance, pickRand } from '../random'

const NAME = 'FIRE'
const despawnChance = 0.2
const chanceOfGoingStraight = 0.73
const chanceOfSpread = 0.75
const ignitingChance = 1
const burningChance = 0.01

const make = (phase = 'spark') =>
  element.make({
    type: NAME,
    phase,
    direction: pickRand([1, -1]),
    color: pickRand([
      [9, 80, 35, 50],
      [7, 80, 48, 58],
      [35, 80, 50, 60],
      [7, 85, 36, 45],
    ]),
  })

const ignite = (sandpit, cell) => {
  let didIgnite = false
  let igniteTarget
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ]

  for (let [nx, ny] of neighbors) {
    if (chance(ignitingChance) && sandpit.is(nx, ny, wood.NAME)) {
      igniteTarget = [nx, ny]
      didIgnite = true
      break
    }
  }

  if (igniteTarget) {
    sandpit.set(...igniteTarget, make('blaze'))
    sandpit.set(0, 0, empty())
  }

  return didIgnite
}

const burn = (sandpit, spreadChance, cell) => {
  let burnTarget
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
    [-2, -2],
    [-2, 0],
    [-2, +2],
    [0, -2],
    [0, +2],
    [+2, -2],
    [+2, 0],
    [+2, +2],
  ]

  for (let [nx, ny] of neighbors) {
    if (chance(spreadChance) && sandpit.is(nx, ny, wood.NAME)) {
      burnTarget = [nx, ny]
    }
  }
  if (burnTarget) sandpit.set(...burnTarget, make('blaze'))
}

const update = (sandpit, cell) => {
  const above = sandpit.get(0, -1)

  switch (cell.phase) {
    case 'spark':
      if (chance(despawnChance)) {
        sandpit.set(0, 0, empty())
      }

      switch (above.type) {
        case EMPTY:
          if (chance(chanceOfGoingStraight)) {
            sandpit.move(0, -1)
          } else if (sandpit.is(cell.direction, -1, EMPTY)) {
            sandpit.move(cell.direction, -1)
          }
          break
      }

      if (chance(chanceOfSpread) && sandpit.is(cell.direction, 0, EMPTY)) {
        sandpit.move(cell.direction, 0)
      } else {
        cell.direction *= -1
      }

      ignite(sandpit, cell)
      break
    case 'blaze':
      burn(sandpit, burningChance, cell)

      if (chance(0.01)) {
        sandpit.set(0, 0, smoke.make())
        return
      }
      break
  }
}

export { NAME, make, update, COLOR }
