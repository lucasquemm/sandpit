import * as sandpit from './sandpit'
import * as canvas from './canvas'
import * as elements from './elements'

window.DEBUG = false
const MAX_FPS = 60
let now, elapsed, then, fpsInterval

const tick = () => {
  sandpit.update()
  canvas.draw(sandpit)
}

const loop = () => {
  requestAnimationFrame(loop)
  now = Date.now()
  elapsed = now - then

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    tick()
  }
}

const start = () => {
  fpsInterval = 1000 / MAX_FPS
  then = Date.now()

  loop()
}

const $canvas = document.querySelector('#canvas')

let drawing = false

const coord = (c) => Math.floor(c / canvas.cellSize)

const getCoords = (e) => {
  const x = coord(e.x)
  const y = coord(e.y)

  return [
    [x, y],
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
}

const handleDrawing = (e) => {
  getCoords(e).forEach((coords) => sandpit.draw(...coords, useElement()))
}

$canvas.addEventListener('mousemove', (e) => {
  if (drawing) handleDrawing(e)
})
$canvas.addEventListener('click', handleDrawing)
$canvas.addEventListener('mousedown', () => {
  drawing = true
})
$canvas.addEventListener('mouseup', () => {
  drawing = false
})

let selectedElement = 'sand'

const stoneBtn = document.querySelector('#pedra-btn')
const sandBtn = document.querySelector('#areia-btn')
const emptyBtn = document.querySelector('#ar-btn')
const waterBtn = document.querySelector('#water-btn')
const smokeBtn = document.querySelector('#smoke-btn')
const woodBtn = document.querySelector('#wood-btn')
const fireBtn = document.querySelector('#fire-btn')
const oilBtn = document.querySelector('#oil-btn')
const plantBtn = document.querySelector('#plant-btn')

const useElement = () => elements[selectedElement].make()

stoneBtn.addEventListener('click', () => {
  return (selectedElement = 'stone')
})

sandBtn.addEventListener('click', () => {
  return (selectedElement = 'sand')
})

emptyBtn.addEventListener('click', () => {
  return (selectedElement = 'empty')
})

waterBtn.addEventListener('click', () => {
  return (selectedElement = 'water')
})

smokeBtn.addEventListener('click', () => {
  return (selectedElement = 'smoke')
})

woodBtn.addEventListener('click', () => {
  return (selectedElement = 'wood')
})

fireBtn.addEventListener('click', () => {
  return (selectedElement = 'fire')
})

oilBtn.addEventListener('click', () => {
  return (selectedElement = 'oil')
})

plantBtn.addEventListener('click', () => {
  return (selectedElement = 'plant')
})

document.querySelector('#tick').addEventListener('click', tick)

sandpit.init()

if (!window.DEBUG) {
  start()
}
