import * as element from '../element'
import { pickRand } from '../random'
import { liquid } from '../traits/liquid'

const color = 0x7e4720
const NAME = 'OIL'

const make = () =>
  element.make({
    type: NAME,
    flammability: 0.8,
    liquid: true,
    direction: pickRand([1, -1]),
    color,
  })

const update = (sandpit, cell) => {
  liquid(sandpit, cell, NAME)
}

export { NAME, make, update, color }
