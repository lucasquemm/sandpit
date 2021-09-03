import * as sand from './sand'
import * as stone from './stone'
import * as empty from './empty'
import * as water from './water'
import * as smoke from './smoke'
import * as wood from './wood'
import * as fire from './fire'
import * as oil from './oil'
import * as plant from './plant'
import * as slime from './slime'
import * as lava from './lava'
import * as bug from './bug'
import * as gunpowder from './gunpowder'
import * as acid from './acid'

export const activeElements = {
  [sand.NAME]: sand,
  [water.NAME]: water,
  [smoke.NAME]: smoke,
  [fire.NAME]: fire,
  [oil.NAME]: oil,
  [plant.NAME]: plant,
  [slime.NAME]: slime,
  [lava.NAME]: lava,
  [bug.NAME]: bug,
  [gunpowder.NAME]: gunpowder,
  [acid.NAME]: acid,
}

export default {
  sand,
  stone,
  empty,
  water,
  smoke,
  wood,
  fire,
  oil,
  plant,
  slime,
  lava,
  bug,
  gunpowder,
  acid,
}
