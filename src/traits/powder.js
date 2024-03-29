import { EMPTY } from '../elements/empty'
import { chance, pickRand } from '../random'

const powder = (sandpit, SELF, cell, { clumpiness = 0 } = {}) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  if (below.type === SELF) {
    if (!cell.clump && sandpit.is(direction, 1, EMPTY)) {
      sandpit.move(direction, 1)
    }
  } else if (!below.solid) {
    sandpit.swap(0, 1)
  }

  if (chance(clumpiness)) {
    cell.clump = true
  }
}

export default powder
