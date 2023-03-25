import * as element from '../element'
import { OIL } from './oil'

import { pickRand } from '../random'
import { liquid } from '../traits/liquid'

const color = 0x578cdb

const WATER = 'WATER'
const make = () =>
  element.make({
    type: WATER,
    color,
    slimey: false,
    liquid: true,
    direction: pickRand([1, -1]),
  })

const update = (sandpit, cell) => {
  if (sandpit.is(0, 1, OIL)) {
    sandpit.swap(0, 1)
  }

  liquid(sandpit, cell, WATER)

  if (cell.slimey) {
    element.setColor(0xb6f6e4, cell)
    cell.slimey = false
  }
}

export { WATER, make, update, color }
