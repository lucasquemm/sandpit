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

const getCoords = (index) => {
  const y = index % size
  const x = (index - y) / size

  return [x, y]
}

const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return { type: 'BOUNDS' }
  return state[getIndex(x, y)]
}

const draw = (x, y, cell) => {
  if (cell.type === air.NAME || is(x, y, air.NAME)) {
    cell.clock = generation
    state[getIndex(x, y)] = cell
  }
}

const set = (x, y, cell) => {
  if (cell.clock > generation) return
  cell.clock = generation + 1
  state[getIndex(x, y)] = cell
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
  for (let i = 0, l = state.length; i < l; i++) {
    const [x, y] = getCoords(i)
    const cell = state[i]
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
    }
  }
  generation++
}

const forEach = (f) => {
  for (let i = 0, l = state.length; i < l; i++) {
    const [x, y] = getCoords(i)
    const cell = state[i]
    f(x, y, cell)
  }
}

export { init, get, draw, update, print, forEach }
