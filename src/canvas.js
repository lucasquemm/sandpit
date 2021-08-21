import * as air from './elements/air'

const width = 500
const height = 500
const cellSize = 5
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1
let lastColor

canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
ctx.scale(dpr, dpr)

const draw = (world) => {
  ctx.clearRect(0, world.getBoundingY(), width, height)
  world.forEach(drawCell)
}

const drawCell = (x, y, cell) => {
  switch (cell.type) {
    case air.NAME:
      break
    default:
      drawRect(x, y, cell)
      break
  }
}

const drawRect = (x, y, { color }) => {
  if (lastColor !== color) {
    ctx.fillStyle = color
    lastColor = color
  }
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
}

export { draw, cellSize }
