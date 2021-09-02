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

  return renderer.view
}

const draw = (world) => {
  world.forEachCell((cell, [x, y]) => {
    let sprite = sprites[x][y]
    if (sprite === undefined) {
      sprite = sprites[x][y] = new PIXI.Sprite(texture)
      container.addChild(sprite)
    }
    sprite.position.x = x
    sprite.position.y = y
    sprite.tint = cell.hexColor || 0xffffff
  })
  renderer.render(stage)
}

export { init, draw, cellSize }
