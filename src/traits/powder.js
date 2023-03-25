import { EMPTY } from '../elements/empty'
import * as water from '../elements/water'
import * as oil from '../elements/oil'
import { pickRand } from '../random'

const powder = (sandpit, SELF) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  switch (below.type) {
    case EMPTY:
      sandpit.move(0, 1)
      break
    case oil.NAME:
    case water.NAME:
      sandpit.swap(0, 1)
      break
    case SELF:
      if (sandpit.is(direction, 1, EMPTY)) {
        sandpit.move(direction, 1)
      }
      break
  }
}

export default powder
