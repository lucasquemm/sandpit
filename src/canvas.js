import * as PIXI from 'pixi.js'

const width = 600
const height = 600
const cellSize = 5
const boundsOffset = 5
let ctx
const dpr = window.devicePixelRatio || 1

const init_ = () => {
  const canvas = document.createElement('canvas')

  ctx = canvas.getContext('2d', { alpha: false })

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

const draw_ = (world) => {
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
}

const sprites = Array.from({ length: width / cellSize }, () => [])
let tex
let stage
let renderer
let app

const init = () => {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  app = new PIXI.Application({
    width,
    height,
    view: canvas,
  })

  document.querySelector('#canvas-target').prepend(canvas)

  const graph = new PIXI.Graphics()
  graph.beginFill(0xffffff)
  graph.drawRect(0, 0, 1, 1)
  graph.endFill()

  tex = app.renderer.generateTexture(graph)
  app.stage.scale.set(5)

  return canvas
}

const draw = (world) => {
  world.forEachCell((cell, [x, y]) => {
    let sprite = sprites[x][y]

    if (sprite === undefined) {
      sprite = sprites[x][y] = new PIXI.Sprite(tex)
      app.stage.addChild(sprite)
    }

    sprite.position.x = x
    sprite.position.y = y
    sprite.tint = cell.type === 'EMPTY' ? 0x000000 : 0xffffff
  })
}

export { init, draw, cellSize }
