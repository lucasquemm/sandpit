import * as sand from './elements/sand'
import * as air from './elements/air'
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
  return state[y][x]
}

const set = (x, y, cell) => {
  state[y][x] = cell
}

const is = (x, y, type) => {
  return state[y][x].type === type
}

const neighbors = () => {}

const update = () => {
  const dirtyCells = []

  const setDirty = (x, y, cell) => {
    dirtyCells.push({ x, y, cell })
  }

  const move = (x, y, offsetX = 0, offsetY = 0) => {
    const cell = get(x, y)
    setDirty(x + offsetX, y + offsetY, cell)
    setDirty(x, y, air.make())
  }

  const api = { get, set: setDirty, neighbors, move, is }

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
      }
    }
  }

  for (let { x, y, cell } of dirtyCells) {
    set(x, y, cell)
  }
}

const print = () => {
  console.log(state.map((row) => row.map((c) => c.type[0]).join('')).join('\n'))
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
