import * as sand from './elements/sand'
import * as air from './elements/air'
import * as water from './elements/water'
import * as stone from './elements/stone'
import * as smoke from './elements/smoke'
import * as wood from './elements/wood'

let cells = []
let size = 0
let generation
let boundingY
let activeCells

const init = (newSize = 100) => {
  generation = 1
  boundingY = newSize
  activeCells = []
  size = newSize
  cells = Array.from({ length: size * size }, () => air.make())
}

const getIndex = (x, y) => x * size + y

const getCoords = (index) => {
  const y = index % size
  const x = (index - y) / size

  return [x, y]
}

const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return { type: 'BOUNDS' }
  return cells[getIndex(x, y)]
}

const draw = (x, y, cell) => {
  if (cell.type === air.NAME || is(x, y, air.NAME) || is(x, y, water.NAME)) {
    const index = getIndex(x, y)
    cell.clock = generation
    cells[index] = cell
    if (y < boundingY) boundingY = y
  }
}

const set = (x, y, cell) => {
  const index = getIndex(x, y)
  cell.clock = generation + 1
  cells[index] = cell
  if (y < boundingY) boundingY = y
}

const is = (x, y, type) => get(x, y).type === type

const move = (x, y, offsetX = 0, offsetY = 0) => {
  const cell = get(x, y)

  if (cell.clock > generation) return

  set(x + offsetX, y + offsetY, cell)
  set(x, y, air.make())
}

const swap = (x, y, offsetX = 0, offsetY = 0) => {
  const c0 = get(x, y)

  if (c0.clock > generation) return

  const x1 = x + offsetX
  const y1 = y + offsetY
  const c1 = get(x1, y1)

  set(x1, y1, c0)
  set(x, y, c1)
}

const api = {
  get,
  set,
  swap,
  move,
  is,
}

const update = () => {
  activeCells = []
  boundingY = size
  for (let i = 0, l = cells.length; i < l; i++) {
    const [x, y] = getCoords(i)
    const cell = cells[i]
    if (cell.type !== 'AIR') activeCells.push({ x, y, cell })
    switch (cell.type) {
      case 'AIR':
        break
      case sand.NAME:
        sand.update(x, y, api, cell)
        break
      case stone.NAME:
        stone.update(x, y, api, cell)
        break
      case water.NAME:
        water.update(x, y, api, cell)
        break
      case smoke.NAME:
        smoke.update(x, y, api, cell)
        break
      case wood.NAME:
        wood.update(x, y, api, cell)
    }
  }
  generation++
}

const getBoundingY = () => boundingY

const getActive = () => activeCells

export { init, getBoundingY, get, draw, update, print, getActive }
