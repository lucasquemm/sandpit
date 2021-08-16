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
      sand.make(),
    )
})
$canvas.addEventListener('mousedown', () => {
  drawing = true
})
$canvas.addEventListener('mouseup', () => {
  drawing = false
})

world.init()
loop()

window.loop = loop
window.world = world
