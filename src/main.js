import * as sandpit from './sandpit'
import * as canvas from './canvas'
import elements from './elements'

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

let selectedElement = elements.sand
let previousElementBtn

const elementsGrid = document.querySelector('.elements')

Object.values(elements).forEach((element) => {
  const btn = document.createElement('button')
  const [h, s, l] = element.BASE_COLOR || []

  if (element.NAME == elements.sand.NAME) {
    previousElementBtn = btn
    btn.classList.add('element-selected')
  }
  btn.textContent = element.NAME.toLowerCase()
  btn.classList.add(element.NAME.toLowerCase() + '-btn')
  btn.classList.add('element-btn')
  btn.style.background = `hsl(${h}deg ${s}% ${l}%)`

  btn.addEventListener('click', () => {
    previousElementBtn.classList.remove('element-selected')
    btn.classList.add('element-selected')
    previousElementBtn = btn
    return (selectedElement = element)
  })

  elementsGrid.appendChild(btn)
})

const useElement = () => selectedElement.make()

const tickBtn = document.querySelector('#tick')

tickBtn.classList.add('hidden')

tickBtn.addEventListener('click', tick)

if (window.DEBUG) {
  tickBtn.classList.remove('hidden')
}

sandpit.init()

if (!window.DEBUG) {
  start()
}
