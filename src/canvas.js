const width = 900
const height = 900
const cellSize = 5
const boundsOffset = 5
let ctx

const init = () => {
  const canvas = document.createElement('canvas')

  ctx = canvas.getContext('2d', { alpha: false })

  const dpr = window.devicePixelRatio || 1

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  document.querySelector('#canvas-target').prepend(canvas)
  ctx.scale(dpr, dpr)
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  return canvas
}

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

    let i = blocks.length

    while (i--) {
      const { x, y } = blocks[i]
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  }

  world.refreshUpperBound()
}

export { init, draw, cellSize }
