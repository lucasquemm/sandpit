import { empty, EMPTY } from './elements/empty'

import { activeElements } from './elements'

let cells = []
let size = 0
let generation
const BOUNDS = { type: 'BOUNDS', solid: true }

const init = (cellsLength) => {
  generation = 1
  size = cellsLength
  cells = Array.from({ length: cellsLength * cellsLength }, () => empty())
}

const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return BOUNDS
  return cells[getIndex(x, y)]
}

const set = (x, y, cell = empty()) => {
  const index = getIndex(x, y)

  if (x < 0 || y < 0 || x >= size || y >= size) return

  cell.clock = generation + 1
  cells[index] = cell
}

const makeNeighbors = (range = 1) => {
  return Array.from({ length: range }, (_, i) => {
    const n = i + 1
    return [
      [n * -1, n * -1],
      [n * -1, 0],
      [n * -1, n * 1],
      [0, n * -1],
      [0, n * 1],
      [n * 1, n * -1],
      [n * 1, 0],
      [n * 1, n * 1],
    ]
  }).flat()
}

const getCircularNeighbors = (r, center) => {
  const [cx, cy] = center
  const cells = []

  for (let x = cx - r; x <= cx; x++) {
    for (let y = cy - r; y <= cy; y++) {
      if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r) {
        const xSym = cx - (x - cx)
        const ySym = cy - (y - cy)

        cells.push([x, y], [x, ySym], [xSym, y], [xSym, ySym])
      }
    }
  }

  return cells
}

const neighbors1 = makeNeighbors(1)
const neighbors2 = makeNeighbors(2)

const createApi = (cx, cy) => {
  const relativeGet = (dx, dy) => get(cx + dx, cy + dy)
  const relativeSet = (dx, dy, cell) => set(cx + dx, cy + dy, cell)
  const relativeCircular = (r, dx, dy) =>
    getCircularNeighbors(r, [cx + dx, cy + dy])

  const is = (dx, dy, type) => get(cx + dx, cy + dy).type === type

  const move = (dx, dy) => {
    const cell = get(cx, cy)

    if (cell.clock > generation) return

    set(cx + dx, cy + dy, cell)
    set(cx, cy, empty())
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

  return {
    is,
    move,
    swap,
    set: relativeSet,
    absoluteSet: set,
    get: relativeGet,
    absoluteGet: get,
    neighbors1,
    neighbors2,
    getCircularNeighbors: relativeCircular,
  }
}

const coordsCache = {}

const self = createApi(0, 0)

const getIndex = (x, y) => x * size + y

const getCoords = (index) => {
  const cache = coordsCache[index]

  if (cache !== undefined) return cache

  const y = index % size
  const x = (index - y) / size

  return (coordsCache[index] = [x, y])
}

const draw = (x, y, cell) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return
  if (cell.type === EMPTY || self.is(x, y, EMPTY)) {
    const index = getIndex(x, y)
    cell.clock = generation
    cells[index] = cell
  }
}

const update = () => {
  for (let i = 0, l = cells.length; i < l; i++) {
    const [x, y] = getCoords(i)
    const cell = cells[i]
    const element = activeElements[cell.type]

    if (element !== undefined) {
      element.update(createApi(x, y), cell)
    }
  }

  generation++
}

const forEachCell = (cb) => {
  for (let i = 0, l = cells.length; i < l; i++) {
    const coords = getCoords(i)
    const cell = cells[i]

    cb(cell, coords)
  }
}

export { init, draw, update, forEachCell, getCircularNeighbors }
