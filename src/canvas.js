const width = 500
const height = 500
const cellSize = 5
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d', { alpha: false })
const dpr = window.devicePixelRatio || 1
let lastColor
const boundsOffset = 5

canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
ctx.scale(dpr, dpr)
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, width, height)

const draw = (world) => {
  const boundingY = world.getBoundingY() * cellSize - boundsOffset

  ctx.fillStyle = 'white'
  ctx.fillRect(0, boundingY, width, height - boundingY)

  for (let {
    x,
    y,
    cell: { color },
  } of world.getActive()) {
    if (lastColor !== color) {
      ctx.fillStyle = color
      lastColor = color
    }
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }
}

export { draw, cellSize }
