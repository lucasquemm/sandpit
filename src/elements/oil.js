import * as element from '../element'
import { pickRand } from '../random'
import { liquid } from '../traits/liquid'

const color = 0x7e4720
const OIL = 'OIL'

const make = () =>
  element.make({
    type: OIL,
    flammability: 0.8,
    liquid: true,
    direction: pickRand([1, -1]),
    color,
  })

const update = (sandpit, cell) => {
  liquid(sandpit, cell, OIL, { speed: 0.7 })
}

export { OIL, make, update, color }
