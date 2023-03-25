import * as element from '../element'
import * as oil from './oil'

import { pickRand } from '../random'
import { liquid } from '../traits/liquid'

const BASE_COLOR = [216, 65, 60, 50]

const NAME = 'WATER'
const make = () =>
  element.make({
    type: NAME,
    color: 0x578cdb,
    slimey: false,
    direction: pickRand([1, -1]),
  })

const update = (sandpit, cell) => {
  if (sandpit.is(0, 1, oil.NAME)) {
    sandpit.swap(0, 1)
  }

  liquid(sandpit, cell, NAME)

  if (cell.slimey) {
    element.setColor(0xb6f6e4, cell)
    cell.slimey = false
  }
}

export { NAME, make, update, BASE_COLOR }
