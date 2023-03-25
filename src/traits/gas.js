import { EMPTY, empty } from '../elements/empty'
import { chance, pickRand } from '../random'

const despawnChance = 0.015

const gas = (sandpit) => {
  const dirx = pickRand([1, 0, -1])
  const diry = pickRand([1, 0, -1, -1, -1])
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
