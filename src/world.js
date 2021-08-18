import * as sand from './elements/sand'
import * as air from './elements/air'
import * as water from './elements/water'
import * as stone from './elements/stone'

let state = []
let size = 0
let generation

const init = (newSize = 100) => {
  generation = 1
  size = newSize
  state = Array.from({ length: size * size }, () => air.make())
}

const getIndex = (x, y) => x * size + y

const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size)
    return { type: 'BOUNDS', clock: 0 }
  return state[getIndex(x, y)]
}
const draw = (x, y, cell) => {
  cell.x = x
  cell.y = y
  cell.clock = generation
  state[getIndex(x, y)] = cell
}

const set = (x, y, cell) => {
  if (cell.clock > generation) return
  cell.x = x
  cell.y = y
  cell.clock++
  state[getIndex(x, y)] = cell
}

const is = (x, y, type) => {
  return get(x, y).type === type
}

const replace = (x, y, offsetX = 0, offsetY = 0) => {
  const cell = get(x, y)
  if (cell.clock > generation) return
  set(x + offsetX, y + offsetY, cell)
  set(x, y, air.make())
}

const move = (x, y, offsetX = 0, offsetY = 0) => {
  const x1 = x + offsetX
  const y1 = y + offsetY
  const c0 = get(x, y)
  if (c0.clock > generation) return
  const c1 = get(x1, y1)

  set(x1, y1, c0)
  set(x, y, c1)
}

const api = {
  get,
  set,
  move,
  is,
  replace,
}

const update = () => {
  for (let cell of state) {
    switch (cell.type) {
      case 'AIR':
        break
      case sand.NAME:
        sand.update(cell.x, cell.y, api)
        break
      case stone.NAME:
        stone.update(cell.x, cell.y, api)
        break
      case water.NAME:
        water.update(cell.x, cell.y, api, cell)
        break
    }
  }
  generation++
}

const forEach = (f) => {
  for (let cell of state) {
    f(cell.x, cell.y, cell)
  }
}

export { init, get, draw, update, print, forEach }
