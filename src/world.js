let state = []

const init = (size = 100) =>
  (state = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 'AIR'),
  ))

const get = (x, y) => {}

const set = (x, y, cell) => {}

const update = () => {}

export { init, get, set, update }
