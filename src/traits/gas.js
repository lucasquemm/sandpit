import { EMPTY, empty } from '../elements/empty'
import { chance, pickRand } from '../random'

const gas = (sandpit, { movement, despawnChance }) => {
  const dirx = pickRand(movement.x)
  const diry = pickRand(movement.y)
  const above = sandpit.get(0, -1)

  if (chance(despawnChance)) {
    sandpit.set(0, 0, empty())
  }

  if (above.liquid) {
    sandpit.swap(0, -1)
  }

  if (sandpit.is(dirx, diry, EMPTY)) {
    sandpit.move(dirx, diry)
  }
}

export { gas }
