import { EMPTY } from './empty'
import * as water from './water'
import * as oil from './oil'
import * as element from '../element'
import { pickRand } from '../random'

const BASE_COLOR = [44, 0, 34, 25]

const NAME = 'GUNPOWDER'

const make = () =>
  element.make({
    type: NAME,
    flammable: true,
    explosive: { ratio: 0.1, minRadius: 5, maxRadius: 10 },
    color: BASE_COLOR,
  })

const update = (sandpit) => {
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
    case NAME:
      if (sandpit.is(direction, 1, EMPTY)) {
        sandpit.move(direction, 1)
      }
      break
  }
}

export { NAME, make, update, BASE_COLOR }
