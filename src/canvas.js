const width = 500
const height = 500
const cellSize = 5
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d', { alpha: false })
const dpr = window.devicePixelRatio || 1
const boundsOffset = 5

canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
ctx.scale(dpr, dpr)
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, width, height)

const draw = (world) => {
  const boundingY = world.getUpperBound() * cellSize - boundsOffset

  ctx.fillStyle = 'white'
  ctx.fillRect(0, boundingY, width, height - boundingY)

  if (window.DEBUG) {
    ctx.fillStyle = 'red'
    ctx.fillRect(0, boundingY, width, 1)
  }

  const activeCells = world.getActive()

  for (let color in activeCells) {
    ctx.fillStyle = color
    const blocks = activeCells[color]

    for (let { x, y } of blocks) {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  }

  world.refreshUpperBound()
}

export { draw, cellSize }
