import * as world from './world'
import * as canvas from './canvas'
import * as sand from './elements/sand'
import * as stone from './elements/stone'

const loop = () => {
  world.update()
  canvas.draw(world)
  requestAnimationFrame(loop)
}

const $canvas = document.querySelector('#canvas')

let drawing = false

$canvas.addEventListener('mousemove', (e) => {
  if (drawing)
    world.set(
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

let selectedElement

const stoneBtn = document.querySelector('#pedra-btn')
const sandBtn = document.querySelector('#areia-btn')

const useElement = () => {
  switch (selectedElement) {
    case 'sand':
      return getElement(sand)
      break
    case 'stone':
      return getElement(stone)
      break
  }
}

stoneBtn.addEventListener('click', () => {
  console.log(selectedElement)
  return (selectedElement = 'stone')
})

sandBtn.addEventListener('click', () => {
  console.log(selectedElement)
  return (selectedElement = 'sand')
})

const getElement = (element) => {
  return element.make()
}

world.init()
loop()

window.loop = loop
window.world = world
