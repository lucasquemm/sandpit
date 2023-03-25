import * as element from '../element'
import powder from '../traits/powder'

const color = 0xf1da8e
const NAME = 'SAND'

const make = () =>
  element.make({
    type: NAME,
    color,
    solid: true,
  })

const update = (sandpit, cell) => {
  powder(sandpit, NAME, cell)
}

export { NAME, make, update, color }
