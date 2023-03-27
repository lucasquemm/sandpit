import { EMPTY } from '../elements/empty'
import { FIRE } from '../elements/fire'
import * as element from '../element'
import { chance, pickRand } from '../random'

const liquid = (sandpit, cell, SELF, { speed = 1 } = {}) => {
  const below = sandpit.get(0, 1)

  switch (below.type) {
    case FIRE:
    case EMPTY:
      sandpit.move(0, 1)
      return

    case SELF:
      const d = pickRand([1, -1])
      if (sandpit.is(d, 1, EMPTY)) {
        sandpit.move(d, 1)
      }

      break
  }

  if (chance(speed)) {
    const next = sandpit.get(cell.direction, 0)

    if (next.type === EMPTY || next.type === FIRE) {
      sandpit.move(cell.direction, 0)
    } else if (next.type !== SELF && next.liquid) {
      sandpit.swap(cell.direction, 0)
    } else {
      cell.direction *= -1
    }
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { liquid }
