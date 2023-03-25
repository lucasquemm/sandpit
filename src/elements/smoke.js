import * as element from '../element'
import { pickRand } from '../random'
import { gas } from '../traits/gas'

const color = 0xcbc9c8
const NAME = 'SMOKE'

const make = () =>
  element.make({
    type: NAME,
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

export { NAME, make, update, color }
