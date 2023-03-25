import * as smoke from './smoke'
import { EMPTY, empty } from './empty'
import * as element from '../element'
import { chance, pickRand, randInt } from '../random'

const BASE_COLOR = [35, 76, 62, 72]

const NAME = 'FIRE'
const despawnChance = 0.2

const make = () =>
  element.make({
    type: NAME,
    color: 0xeb4833,
  })

const update = (sandpit, cell) => {
  const above = sandpit.get(0, -1)
  const dirx = pickRand([1, 0, -1])
  const diry = pickRand([1, 0, -1, -1])

  let fuel
  let igniteTarget
  let flammability = 0
  let fireNeighborCount = 0
  let explosive

  // find fuel
  for (let [nx, ny] of sandpit.neighbors1) {
    const neighbor = sandpit.get(nx, ny)
    if (neighbor.flammability > 0) {
      fuel = [nx, ny]
      explosive = neighbor.explosive
      flammability = neighbor.flammability
    }

    if (neighbor.type == EMPTY) {
      igniteTarget = [nx, ny]
    }

    if (neighbor.type == NAME) {
      fireNeighborCount++
    }
  }

  if (fireNeighborCount > 6) {
    cell.color = 0xedb668
  }

  // explode
  if (fuel && explosive && chance(explosive.ratio)) {
    const radius = randInt(explosive.minRadius, explosive.maxRadius)

    for (let [nx, ny] of sandpit.getCircularNeighbors(radius, ...fuel)) {
      if (sandpit.absoluteGet(nx, ny).type !== 'BOUNDS') {
        sandpit.absoluteSet(nx, ny, chance(0.5) ? make() : smoke.make())
      }
    }
    // burn
  } else if (chance(flammability) && fuel && igniteTarget) {
    sandpit.set(...igniteTarget, make())

    if (chance(0.05)) {
      sandpit.set(...fuel, make())
      if (above.type === EMPTY) {
        sandpit.set(0, -1, smoke.make())
      }
    }
  }

  // move
  if (sandpit.is(dirx, diry, EMPTY)) {
    sandpit.move(dirx, diry)
  }

  // die
  if ((!fuel || !igniteTarget) && chance(despawnChance)) {
    sandpit.set(0, 0, empty())
  }
}

export { NAME, make, update, BASE_COLOR }
