import * as element from '../element'
import { empty, EMPTY } from './empty'

const color = 0x1f265e
const SINKHOLE = 'SINKHOLE'

const make = () =>
  element.make({
    type: SINKHOLE,
    color,
    solid: true,
    alphaMode: 'normal-sparse',
  })

const update = (sandpit) => {
  for (let coords of sandpit.neighbors1) {
    const n = sandpit.get(...coords)

    if (n.type !== EMPTY && n.type !== 'BOUNDS' && n.type !== SINKHOLE) {
      sandpit.set(...coords, empty())
    }
  }
}

export { SINKHOLE, make, update, color }
