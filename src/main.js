import * as sandpit from './sandpit'
import * as canvas from './canvas'
import * as sand from './elements/sand'
import * as stone from './elements/stone'
import { empty } from './elements/empty'
import * as water from './elements/water'
import * as smoke from './elements/smoke'
import * as wood from './elements/wood'
import * as fire from './elements/fire'

window.DEBUG = false
const MAX_FPS = 60

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
  startTime = then
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

const elements = {
  sand,
  stone,
  empty: { make: empty },
  water,
  smoke,
  wood,
  fire,
}

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

document.querySelector('#tick').addEventListener('click', tick)

sandpit.init()

if (!window.DEBUG) {
  start()
}
