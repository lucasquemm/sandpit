import * as element from '../element'

const color = 0x999999
const STONE = 'STONE'

const make = () =>
  element.make({ type: STONE, solid: true, color, alphaMode: 'normal-sparse' })

export { STONE, make, color }
