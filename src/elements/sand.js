import * as air from './air'

const NAME = 'SAND'
const make = () => ({ type: NAME })

const update = (x, y, world) => {
  if (world.is(x, y + 1, air.NAME)) {
    let cell = world.get(x, y)
    world.set(x, y + 1, cell)
    world.set(x, y, air.make())
  }
}

export { NAME, make, update }
