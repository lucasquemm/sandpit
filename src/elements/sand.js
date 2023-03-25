import * as element from '../element'
import powder from '../traits/powder'

const BASE_COLOR = [46, 78, 75, 50]

const NAME = 'SAND'

const make = () =>
  element.make({
    type: NAME,
    color: 0xf1da8e,
  })

const update = (sandpit) => {
  powder(sandpit, NAME)
}

export { NAME, make, update, BASE_COLOR }
