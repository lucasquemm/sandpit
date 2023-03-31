import * as element from '../element'

import { EMPTY, empty } from './empty'
import * as smoke from './smoke'

import { chance, pickRand } from '../random'
import { liquid } from '../traits/liquid'

const color = 0xa7eb33

const corrodeChance = {
  0: 0.001,
  1: 0.03,
}

const ACID = 'ACID'
const make = () =>
  element.make({
    type: ACID,
    liquid: true,
    direction: pickRand([1, -1]),
    color,
  })

const update = (sandpit, cell) => {
  for (let [nx, ny] of [
    [0, 1],
    [1, 1],
    [-1, 1],
    [1, 0],
    [-1, 0],
  ]) {
    const nbr = sandpit.get(nx, ny)
    if (nbr.type !== 'BOUNDS' && nbr.type !== ACID && nbr.type != EMPTY) {
      if (chance(corrodeChance[ny])) {
        sandpit.set(nx, ny, empty())
        sandpit.set(0, 0, empty())

        if (sandpit.is(0, -1, EMPTY)) {
          sandpit.set(0, -1, smoke.make())
        }
      }
    }
  }

  liquid(sandpit, cell, ACID)
}

export { ACID, make, update, color }
