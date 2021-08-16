import * as sand from './elements/sand'
import * as air from './elements/air'

let state = []
let size = 0

const init = (newSize = 100) => {
  size = newSize
  state = Array.from({ length: size }, () =>
    Array.from({ length: size }, air.make),
  )
}

const get = (x, y) => {
  return state[x][y]
}

const set = (x, y, cell) => {
  state[x][y] = cell
}

const neighbors = () => {}

const is = (x, y, type) => {
  return state[x][y].type === type
}

const api = { get, set, neighbors, is }

const update = () => {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = state[x][y]
      switch (cell.type) {
        case 'AIR':
          break
        case sand.NAME:
          sand.update(x, y, api)
          break
      }
    }
  }
}

const print = () => {
  console.log(state)
}

export { init, get, set, update, print }
