import * as element from '../element'
import * as sand from './sand'
import * as empty from './empty'
import * as water from './water'
import * as smoke from './smoke'
import * as fire from './fire'
import * as oil from './oil'
import * as plant from './plant'
import * as slime from './slime'
import * as lava from './lava'
import * as bug from './bug'
import * as gunpowder from './gunpowder'
import * as acid from './acid'
import * as steam from './steam'
import * as dirt from './dirt'

export const targetElements = {
  [sand.SAND]: sand,
  [water.WATER]: water,
  [smoke.SMOKE]: smoke,
  [fire.FIRE]: fire,
  [oil.OIL]: oil,
  [plant.PLANT]: plant,
  [slime.SLIME]: slime,
  [lava.LAVA]: lava,
  [bug.BUG]: bug,
  [gunpowder.GUNPOWDER]: gunpowder,
  [acid.ACID]: acid,
  [steam.STEAM]: steam,
  [dirt.DIRT]: dirt,
}

const color = 0xe122c6
const SPAWNER = 'SPAWNER'

const make = () =>
  element.make({
    type: SPAWNER,
    color,
    solid: true,
    alphaMode: 'normal-sparse',
  })

const update = (sandpit, cell) => {
  for (let coords of sandpit.neighbors1) {
    const n = sandpit.get(...coords)
    const isEmpty = n.type === empty.EMPTY

    if (cell.target && isEmpty) {
      sandpit.set(...coords, targetElements[cell.target].make())
      return
    } else if (n.type in targetElements) {
      cell.target = n.type
    }
  }
}

export { SPAWNER, make, update, color }
