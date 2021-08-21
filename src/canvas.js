const width = 500
const height = 500
const cellSize = 5
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d', { alpha: false })
const dpr = window.devicePixelRatio || 1
const boundsOffset = 5
let currentColor

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

  const blocks = world.getActive()
  const first = blocks.pop()

  if (first === undefined) return

  let color = first.cell.color
  const rest = []

  ctx.fillStyle = color

  while (blocks.length + rest.length > 0) {
    let block = blocks.pop()

    if (block === undefined) {
      block = rest.pop()
      color = block.cell.color
      ctx.fillStyle = color
    }

    if (block.cell.color === color) {
      const { x, y } = block
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    } else {
      rest.push(block)
    }
  }
}

const draw_ = (world) => {
  const boundingY = world.getBoundingY() * cellSize - boundsOffset

  ctx.fillStyle = 'white'
  ctx.fillRect(0, boundingY, width, height - boundingY)

  const blocks = world.getActive().sort((b) => b.cell.color)

  for (let { x, y, cell } of blocks) {
    if (currentColor !== cell.color) {
      currentColor = cell.color
      ctx.fillStyle = currentColor
    }

    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }
}
export { draw, cellSize }
