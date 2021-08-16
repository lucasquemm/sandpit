import * as sand from './elements/sand'
import * as air from './elements/air'
import * as stone from './elements/stone'

let canvas = document.getElementById('canvas')

let ctx = canvas.getContext('2d')

const draw = (world) => {
  ctx.clearRect(0, 0, 300, 150)
  world.forEach(drawCell)
}

const drawCell = (x, y, cell) => {
  switch (cell.type) {
    case 'AIR':
      break
    case sand.NAME:
      ctx.fillRect(x, y, 10, 10)
      break
    case stone.NAME:
      ctx.fillRect(x, y, 10, 10)
      break
  }
}

export { draw }
