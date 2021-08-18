import * as air from './air'
import * as element from '../element'

const NAME = 'SAND'

const make = () => element.make({ type: NAME, color: [46, 78, 75, 50] })

const update = (x, y, world) => {
  const below = world.get(x, y + 1)

  switch (below.type) {
    case air.NAME:
      world.replace(x, y, 0, 1)
      break
  }
}

export { NAME, make, update, COLOR }
