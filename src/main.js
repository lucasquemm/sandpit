import * as world from './world'
import * as canvas from './canvas'
import * as sand from './elements/sand'
import * as stone from './elements/stone'
import * as air from './elements/air'
import * as water from './elements/water'

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

$canvas.addEventListener('mousemove', (e) => {
  if (drawing)
    world.draw(
      Math.floor(e.x / canvas.cellSize),
      Math.floor(e.y / canvas.cellSize),
      useElement(),
    )
})
$canvas.addEventListener('click', (e) => {
  world.draw(
    Math.floor(e.x / canvas.cellSize),
    Math.floor(e.y / canvas.cellSize),
    useElement(),
  )
})
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

const elements = { sand, stone, air, water }
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
document.querySelector('#tick').addEventListener('click', tick)

world.init()

if (!DEBUG) {
  loop()
}

window.loop = loop
window.world = world
