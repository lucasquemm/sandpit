import * as sand from './elements/sand'
import * as air from './elements/air'
import * as water from './elements/water'
import * as stone from './elements/stone'
import * as smoke from './elements/smoke'
import * as wood from './elements/wood'

let cells = []
let size = 0
let generation
let upperBound
let defaultUpperBound
let activeCells

const init = (newSize = 100) => {
  generation = 1
  boundingY = newSize
  defaultUpperBound = { x: 0, y: newSize }
  upperBound = defaultUpperBound
  size = newSize
  cells = Array.from({ length: size * size }, () => air.make())
}
const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return { type: 'BOUNDS' }

  return cells[getIndex(x, y)]
}

const set = (x, y, cell) => {
  const index = getIndex(x, y)

  cell.clock = generation + 1
  cells[index] = cell

  if (y < upperBound.y) upperBound = { x, y }
}

const createApi = (cx, cy) => {
  const relativeGet = (dx, dy) => get(cx + dx, cy + dy)

  const is = (dx, dy, type) => get(cx + dx, cy + dy).type === type

  const move = (dx, dy) => {
    const cell = get(cx, cy)

    if (cell.clock > generation) return

    set(cx + dx, cy + dy, cell)
    set(cx, cy, air.make())
  }

  const swap = (dx, dy) => {
    const c0 = get(cx, cy)

    if (c0.clock > generation) return

    const x = cx + dx
    const y = cy + dy
    const c1 = get(x, y)

    set(x, y, c0)
    set(cx, cy, c1)
  }

  return { is, move, swap, set, get: relativeGet }
}

const self = createApi(0, 0)

const getIndex = (x, y) => x * size + y

const getCoords = (index) => {
  const y = index % size
  const x = (index - y) / size

  return [x, y]
}

const draw = (x, y, cell) => {
  if (
    cell.type === air.NAME ||
    self.is(x, y, air.NAME) ||
    self.is(x, y, water.NAME)
  ) {
    const index = getIndex(x, y)
    cell.clock = generation
    cells[index] = cell
    if (y < upperBound.y) upperBound = { x, y }
  }
}

const update = () => {
  activeCells = {}

  for (let i = 0, l = cells.length; i < l; i++) {
    const [x, y] = getCoords(i)
    const cell = cells[i]

    if (cell.type !== 'AIR') {
      if (cell.color in activeCells) {
        activeCells[cell.color].push({ x, y, cell })
      } else {
        activeCells[cell.color] = [{ x, y, cell }]
      }
    }

    const api = createApi(x, y)

    switch (cell.type) {
      case 'AIR':
        break
      case sand.NAME:
        sand.update(api, cell)
        break
      case stone.NAME:
        stone.update(api, cell)
        break
      case water.NAME:
        water.update(api, cell)
        break
      case smoke.NAME:
        smoke.update(api, cell)
        break
      case wood.NAME:
        wood.update(api, cell)
    }
  }
  generation++
}

const getUpperBound = () => upperBound.y

const refreshUpperBound = () => {
  if (self.is(upperBound.x, upperBound.y, 'AIR')) {
    upperBound = defaultUpperBound
  }
}

const getActive = () => activeCells

export { init, getUpperBound, refreshUpperBound, draw, update, getActive }
