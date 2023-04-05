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
import * as steam from './steam'
import * as dirt from './dirt'
import * as spawner from './spawner'
import * as sinkhole from './sinkhole'

export const staticElements = {
  [stone.STONE]: stone,
  [wood.WOOD]: wood,
  [empty.EMPTY]: empty,
}

export const activeElements = {
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
  [spawner.SPAWNER]: spawner,
  [sinkhole.SINKHOLE]: sinkhole,
}

export const elements = { ...staticElements, ...activeElements }
