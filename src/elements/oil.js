import * as element from '../element'
import { pickRand } from '../random'
import { liquid } from '../traits/liquid'

const BASE_COLOR = [25, 59, 31, 45]

const NAME = 'OIL'

const make = () =>
  element.make({
    type: NAME,
    flammability: 0.8,
    direction: pickRand([1, -1]),
    color: 0x7e4720,
  })

const update = (sandpit, cell) => {
  liquid(sandpit, cell, NAME)
}

export { NAME, make, update, BASE_COLOR }
