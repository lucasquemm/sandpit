import { EMPTY } from './empty'
import * as element from '../element'
import * as fire from './fire'
import * as oil from './oil'

import { chance, pickRand, rand } from '../random'

const BASE_COLOR = [216, 65, 60, 50]

const NAME = 'WATER'
const make = () =>
  element.make({
    type: NAME,
    hexColor: 0x578cdb,
    slimey: false,
    direction: pickRand([1, -1]),
    alpha: rand(1, 0.9),
  })

const update = (sandpit, cell) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case fire.NAME:
    case EMPTY:
      sandpit.move(0, 1)
      break
    case oil.NAME:
      sandpit.swap(0, 1)
      break
    case NAME:
      if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, 1)
      }
      break
  }

  if (
    sandpit.is(cell.direction, 0, EMPTY) ||
    sandpit.is(cell.direction, 0, fire.NAME)
  ) {
    sandpit.move(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }

  if (cell.slimey) {
    element.setColor(0xb6f6e4, cell)
    cell.slimey = false
  }
}

export { NAME, make, update, BASE_COLOR }
