import * as element from '../element'
import { pickRand } from '../random'
import { gas } from '../traits/gas'

const BASE_COLOR = [4, 2, 79, 90]

const NAME = 'SMOKE'

const make = () =>
  element.make({
    type: NAME,
    color: 0xcbc9c8,
    direction: pickRand([1, -1]),
  })

const update = (sandpit, cell) => {
  gas(sandpit, cell)
}

export { NAME, make, update, BASE_COLOR }
