import * as sand from './elements/sand'

let state = []
let size = 0

const init = (newSize = 100) => {
  size = newSize
  state = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: 'AIR' })),
  )
}

const get = (x, y) => {}

const set = (x, y, cell) => {}

const neighbors = () => {}

const api = { get, set, neighbors }

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

export { init, get, set, update }
