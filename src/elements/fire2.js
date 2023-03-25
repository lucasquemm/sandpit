import * as water from './water'
import * as slime from './slime'
import * as sand from './sand'
import * as smoke from './smoke'
import * as oil from './oil'
import * as lava from './lava'
import * as gunpowder from './gunpowder'
import { EMPTY, empty } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'

const BASE_COLOR = [35, 76, 62, 72]

const NAME = 'FIRE2'
const despawnChance = 0.2
const chanceOfGoingStraight = 0.95
const ignitingChance = 0.35

const make = () =>
  element.make({
    type: NAME,
    color: pickRand([0xeb4833, 0xedb668, 0xe32e16]),
    direction: pickRand([1, -1]),
  })

const update = (sandpit, cell) => {
  const above = sandpit.get(0, -1)

  let fuel
  let igniteTarget

  for (let [nx, ny] of sandpit.neighbors1) {
    const neighbor = sandpit.get(nx, ny)
    if (neighbor.flammable) {
      fuel = [nx, ny]
    }
    if (neighbor.type == EMPTY) {
      igniteTarget = [nx, ny]
    }
  }

  if (chance(0.5) && fuel && igniteTarget) {
    sandpit.set(...igniteTarget, make())

    if (chance(0.05)) {
      sandpit.set(...fuel, make())
    }
  }

  if (!fuel && chance(despawnChance)) {
    sandpit.set(0, 0, empty())
  } else if (chance(0.5) && above.type === EMPTY) {
    sandpit.set(0, -1, smoke.make())
  }

  switch (above.type) {
    case EMPTY:
      if (chance(chanceOfGoingStraight)) {
        sandpit.move(0, -1)
        if (fuel) sandpit.set(0, 0, make())
      } else if (sandpit.is(cell.direction, 1, EMPTY)) {
        sandpit.move(cell.direction, -1)
        if (fuel) sandpit.set(0, 0, make())
      }
      break
  }
}

export { NAME, make, update, BASE_COLOR }
