import * as sand from './elements/sand'
import * as air from './elements/air'
import * as stone from './elements/stone'

const width = 500
const height = 500
const size = 10
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
ctx.scale(dpr, dpr)

const draw = (world) => {
  ctx.clearRect(0, 0, width, height)
  world.forEach(drawCell)
}

const drawCell = (x, y, cell) => {
  switch (cell.type) {
    case 'AIR':
      break
    case sand.NAME:
      ctx.fillStyle = sand.COLOR
      ctx.fillRect(x * size, y * size, size, size)

      break
    case stone.NAME:
      ctx.fillStyle = stone.COLOR
      ctx.fillRect(x * size, y * size, size, size)
      break
  }
}

export { draw }
