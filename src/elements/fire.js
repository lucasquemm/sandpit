import { EMPTY, empty } from './empty'
import * as water from './water'
import * as steam from './steam'
import * as element from '../element'
import { chance, pickRand } from '../random'
import burn from '../traits/burn'

const BASE_COLOR = [35, 76, 62, 72]

const NAME = 'FIRE'
const despawnChance = 0.2

const make = () =>
  element.make({
    type: NAME,
    color: 0xeb4833,
  })

const update = (sandpit, cell) => {
  const dirx = pickRand([1, 0, -1])
  const diry = pickRand([1, 0, -1, -1])

  const { fuel, igniteTarget } = burn(sandpit, cell)
  let fireNeighborCount = 0

  for (let [nx, ny] of sandpit.neighbors1) {
    if (sandpit.is(nx, ny, NAME)) {
      fireNeighborCount++
    }

    if (chance(0.05) && sandpit.is(nx, ny, water.NAME)) {
      sandpit.set(nx, ny, steam.make())
    }
  }

  if (fireNeighborCount > 6) {
    cell.color = 0xedb668
  }

  if (sandpit.is(dirx, diry, EMPTY)) {
    sandpit.move(dirx, diry)
  }

  if ((!fuel || !igniteTarget) && chance(despawnChance)) {
    sandpit.set(0, 0, empty())
  }
}

export { NAME, make, update, BASE_COLOR }
