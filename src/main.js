import * as world from './world'
import * as canvas from './canvas'
import * as sand from './elements/sand'
import * as stone from './elements/stone'
import * as air from './elements/air'
import * as water from './elements/water'
import * as smoke from './elements/smoke'

const DEBUG = false

const tick = () => {
  world.update()
  canvas.draw(world)
}

const loop = () => {
  tick()
  requestAnimationFrame(loop)
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
  getCoords(e).forEach((coords) => world.draw(...coords, useElement()))
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
const airBtn = document.querySelector('#ar-btn')
const waterBtn = document.querySelector('#water-btn')
const smokeBtn = document.querySelector('#smoke-btn')

const elements = { sand, stone, air, water, smoke }
const useElement = () => elements[selectedElement].make()

stoneBtn.addEventListener('click', () => {
  return (selectedElement = 'stone')
})

sandBtn.addEventListener('click', () => {
  return (selectedElement = 'sand')
})

airBtn.addEventListener('click', () => {
  return (selectedElement = 'air')
})

waterBtn.addEventListener('click', () => {
  return (selectedElement = 'water')
})

smokeBtn.addEventListener('click', () => {
  return (selectedElement = 'smoke')
})

document.querySelector('#tick').addEventListener('click', tick)

world.init()

if (!DEBUG) {
  loop()
}

window.loop = loop
window.world = world
