import { EMPTY } from './empty'
import * as smoke from './smoke'
import * as stone from './stone'
import * as element from '../element'
import { chance, pickRand } from '../random'
import * as fire from './fire'
import { liquid } from '../traits/liquid'
import burn from '../traits/burn'
import { WATER } from './water'

const color = 0xd67443
const LAVA = 'LAVA'

const make = () =>
  element.make({
    type: LAVA,
    direction: pickRand([1, -1]),
    liquid: true,
    color,
  })

const update = (sandpit, cell) => {
  liquid(sandpit, cell, LAVA, { speed: 0.3 })
  const { fuel, igniteTarget } = burn(sandpit)

  if (sandpit.is(pickRand([1, -1]), pickRand([0, 1, -1]), WATER)) {
    sandpit.set(0, 0, stone.make())
  }

  if (chance(0.005) && sandpit.is(0, -1, EMPTY)) {
    sandpit.set(0, -1, fire.make())
  }

  if (fuel && !igniteTarget && chance(sandpit.get(...fuel).flammability / 10)) {
    sandpit.set(...fuel, smoke.make())
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { LAVA, make, update, color }
