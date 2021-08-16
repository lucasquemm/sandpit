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
      drawRect(x, y, sand)
      break
    case stone.NAME:
      drawRect(x, y, stone)
      break
  }
}

const drawRect = (x, y, element) => {
  ctx.fillStyle = element.COLOR
  ctx.fillRect(x * size, y * size, size, size)
}

export { draw }
