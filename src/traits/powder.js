import { EMPTY } from '../elements/empty'
import { pickRand } from '../random'

const powder = (sandpit, SELF) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  if (below.type === SELF) {
    if (sandpit.is(direction, 1, EMPTY)) {
      sandpit.move(direction, 1)
    }
  } else if (!below.solid) {
    sandpit.swap(0, 1)
  }
}

export default powder
