import * as element from '../element'
import { chance, pickRand } from '../random'
import * as water from './water'
import { gas } from '../traits/gas'

const color = 0xeffdff
const STEAM = 'STEAM'

const make = () =>
  element.make({
    type: STEAM,
    color,
    direction: pickRand([1, -1]),
    alphaMode: 'normal',
  })

const update = (sandpit) => {
  gas(sandpit, {
    movement: {
      x: [1, 0, -1],
      y: [-1],
    },
    despawnChance: 0.05,
  })

  if (sandpit.get(0, -1).solid && chance(0.005)) sandpit.set(0, 0, water.make())
}

export { STEAM, make, update, color }
