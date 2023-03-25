import * as smoke from '../elements/smoke'
import * as fire from '../elements/fire'
import { EMPTY } from '../elements/empty'
import { chance, randInt } from '../random'

const burn = (sandpit) => {
  let fuel
  let igniteTarget
  let flammability = 0
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
  }

  // explode
  if (fuel && explosive && chance(explosive.ratio)) {
    const radius = randInt(explosive.minRadius, explosive.maxRadius)

    for (let [nx, ny] of sandpit.getCircularNeighbors(radius, ...fuel)) {
      if (sandpit.absoluteGet(nx, ny).type !== 'BOUNDS') {
        sandpit.absoluteSet(nx, ny, chance(0.5) ? fire.make() : smoke.make())
      }
    }
    // burn
  } else if (chance(flammability) && fuel && igniteTarget) {
    sandpit.set(...igniteTarget, fire.make())

    if (chance(0.05)) {
      sandpit.set(...fuel, fire.make())
      if (sandpit.is(0, -1, EMPTY)) {
        sandpit.set(0, -1, smoke.make())
      }
    }
  }

  return { fuel, igniteTarget }
}

export default burn
