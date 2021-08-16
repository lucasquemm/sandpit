import * as air from './air'

const NAME = 'SAND'
const COLOR = '#f0d784'
const make = () => ({ type: NAME })

const update = (x, y, world) => {
  if (world.is(x, y + 1, air.NAME)) {
    world.move(x, y, 0, 1)
  }
}

export { NAME, make, update, COLOR }
