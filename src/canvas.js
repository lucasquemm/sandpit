import * as PIXI from 'pixi.js'

const width = Math.min(600, window.innerWidth)
const height = Math.max(600, window.innerHeight)
const size = Math.min(width, height) - 20
const cellSize = 3
const cellsLength = Math.floor(size / cellSize)
const totalCells = cellsLength * cellsLength

const sprites = Array.from({ length: cellsLength }, () => [])

let texture
let stage
let renderer
let container

const init = () => {
  const canvas = document.createElement('canvas')

  renderer = new PIXI.autoDetectRenderer({
    width: size,
    height: size,
    view: canvas,
  })
  document.querySelector('#canvas-target').prepend(canvas)

  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`

  stage = new PIXI.Container()

  const graphic = new PIXI.Graphics()
  graphic.beginFill(0xffffff)
  graphic.drawRect(0, 0, 1, 1)

  container = new PIXI.ParticleContainer(totalCells, {
    alpha: true,
  })
  texture = renderer.generateTexture(graphic)

  container.scale.set(cellSize, cellSize)
  stage.addChild(container)

  for (let x = 0; x < cellsLength; x++) {
    for (let y = 0; y < cellsLength; y++) {
      const sprite = new PIXI.Sprite(texture)
      sprite.position.x = x
      sprite.position.y = y
      sprites[x][y] = sprite

      container.addChild(sprite)
    }
  }

  return { cellsLength, canvas: renderer.view }
}

const draw = (world) => {
  world.forEachCell((cell, [x, y]) => {
    let sprite = sprites[x][y]

    sprite.tint = cell.color || 0xffffff

    switch (cell.alphaMode) {
      case 'normal':
        sprite.alpha = Math.min(cell.r1 + 0.7, 1)
        break
      case 'normal-sparse':
        sprite.alpha = Math.min(cell.r2 + 0.7, 1)
        break
      case 'random':
        sprite.alpha = cell.r0
        break
      case 'solid':
        sprite.alpha = 1
        break
    }
  })
  renderer.render(stage)
}

export { init, draw, cellSize }
