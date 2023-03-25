import { EMPTY } from '../elements/empty'
import { FIRE } from '../elements/fire'
import * as element from '../element'
import { chance } from '../random'

const liquid = (sandpit, cell, SELF) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case FIRE:
    case EMPTY:
      sandpit.move(0, 1)
      break
    case SELF:
      if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, 1)
      }
      break
  }

  const next = sandpit.get(cell.direction, 0)

  if (next.type === EMPTY || next.type === FIRE) {
    sandpit.move(cell.direction, 0)
  } else if (next.type !== SELF && next.liquid) {
    sandpit.swap(cell.direction, 0)
  } else {
    cell.direction *= -1
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { liquid }
