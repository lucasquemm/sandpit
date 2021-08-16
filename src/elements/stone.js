const NAME = 'STONE'
const make = () => ({ type: NAME })

const update = (x, y, world) => {
  world.set(x, y, make())
}

export { NAME, make, update }
