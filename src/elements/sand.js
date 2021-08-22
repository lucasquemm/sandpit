import * as air from './air'
import * as water from './water'
import * as element from '../element'
import { pickRand } from '../random'

const NAME = 'SAND'

const make = () => element.make({ type: NAME, color: [46, 78, 75, 50] })

const update = (sandpit) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  switch (below.type) {
    case air.NAME:
      sandpit.move(0, 1)
      break
    case water.NAME:
      sandpit.swap(0, 1)
      break
    case NAME:
      if (sandpit.is(direction, 1, air.NAME)) {
        sandpit.move(direction, 1)
      }
      break
  }
}

export { NAME, make, update, COLOR }
