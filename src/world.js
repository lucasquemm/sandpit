import * as sand from './elements/sand'
import * as air from './elements/air'
import * as water from './elements/water'
import * as stone from './elements/stone'

let state = []
let size = 0

const init = (newSize = 100) => {
  size = newSize
  state = Array.from({ length: size }, () =>
    Array.from({ length: size }, air.make),
  )
}

const get = (x, y) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return { type: 'BOUNDS' }
  return state[y][x]
}

const set = (x, y, cell) => {
  state[y][x] = cell
}

const update = () => {
  const dirtyCells = {}

  const setDirty = (x, y, cell) => {
    dirtyCells[`${x}-${y}`] = { x, y, cell }
  }

  const getDirty = (x, y) => {
    return dirtyCells[`${x}-${y}`] || get(x, y)
  }

  const isDirty = (x, y, type) => {
    return getDirty(x, y).type === type
  }

  const replace = (x, y, offsetX = 0, offsetY = 0) => {
    const cell = get(x, y)
    setDirty(x + offsetX, y + offsetY, cell)
    setDirty(x, y, air.make())
  }

  const move = (x, y, offsetX = 0, offsetY = 0) => {
    const x1 = x + offsetX
    const y1 = y + offsetY
    const c0 = getDirty(x, y)
    const c1 = getDirty(x1, y1)

    setDirty(x1, y1, c0)
    setDirty(x, y, c1)
  }

  const api = {
    get: getDirty,
    set: setDirty,
    move,
    is: isDirty,
    replace,
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = get(x, y)
      switch (cell.type) {
        case 'AIR':
          break
        case sand.NAME:
          sand.update(x, y, api)
          break
        case stone.NAME:
          stone.update(x, y, api)
          break
        case water.NAME:
          water.update(x, y, api, cell)
          break
      }
    }
  }

  for (let { x, y, cell } of Object.values(dirtyCells)) {
    set(x, y, cell)
  }
}

const forEach = (f) => {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = get(x, y)
      f(x, y, cell)
    }
  }
}

export { init, get, set, update, print, forEach }
