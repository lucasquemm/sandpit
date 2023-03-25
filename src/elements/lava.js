import { EMPTY } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'
import * as fire from './fire'
import { liquid } from '../traits/liquid'
import burn from '../traits/burn'

const color = 0xd67443
const NAME = 'LAVA'

const make = () =>
  element.make({
    type: NAME,
    direction: pickRand([1, -1]),
    color,
  })

const update = (sandpit, cell) => {
  liquid(sandpit, cell, NAME)
  burn(sandpit)

  if (chance(0.005) && sandpit.is(0, -1, EMPTY)) {
    sandpit.set(0, -1, fire.make())
  }

  if (chance(0.005)) {
    element.refreshColor(cell)
  }
}

export { NAME, make, update, color }
