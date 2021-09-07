import * as PIXI from 'pixi.js'

const width = 600
const height = 600
const cellSize = 5

const sprites = Array.from({ length: width / cellSize }, () => [])
let texture
let stage
let renderer
let container

const init = () => {
  const canvas = document.createElement('canvas')

  renderer = new PIXI.autoDetectRenderer({
    width,
    height,
    view: canvas,
  })
  document.querySelector('#canvas-target').prepend(canvas)

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  stage = new PIXI.Container()
  let total = 14400

  const graphic = new PIXI.Graphics()
  graphic.beginFill(0xffffff)
  graphic.drawRect(0, 0, 1, 1)

  container = new PIXI.ParticleContainer(total, {
    alpha: true,
  })
  texture = renderer.generateTexture(graphic)

  container.scale.set(5, 5)
  stage.addChild(container)

  const w = width / cellSize
  const h = height / cellSize

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const sprite = new PIXI.Sprite(texture)
      sprite.position.x = x
      sprite.position.y = y
      sprites[x][y] = sprite

      container.addChild(sprite)
    }
  }

  return renderer.view
}

const draw = (world) => {
  world.forEachCell((cell, [x, y]) => {
    let sprite = sprites[x][y]
    sprite.tint = cell.color || 0xffffff
    sprite.alpha = cell.alpha || 1
  })
  renderer.render(stage)
}

export { init, draw, cellSize }
