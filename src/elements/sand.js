import { EMPTY } from './empty'
import * as water from './water'
import * as oil from './oil'
import * as element from '../element'
import { rand, pickRand } from '../random'

const BASE_COLOR = [46, 78, 75, 50]

const NAME = 'SAND'

const make = () =>
  element.make({
    type: NAME,
    hexColor: 0xf1da8e,
    alpha: rand(1, 0.8),
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
