import * as element from '../element'
import { pickRand } from '../random'
import { gas } from '../traits/gas'

const color = 0xcbc9c8
const SMOKE = 'SMOKE'

const make = () =>
  element.make({
    type: SMOKE,
    color,
    direction: pickRand([1, -1]),
  })

const update = (sandpit) => {
  gas(sandpit, {
    movement: {
      x: [1, 0, -1],
      y: [1, 0, -1, -1, -1],
    },
    despawnChance: 0.015,
  })
}

export { SMOKE, make, update, color }
