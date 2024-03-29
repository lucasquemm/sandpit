import * as sandpit from './sandpit'
import * as canvas from './canvas'
import { elements } from './elements'
import * as PIXI from 'pixi.js'
import { SAND } from './elements/sand'

window.DEBUG = false

const tick = () => {
  sandpit.update()
  canvas.draw(sandpit)
}

let selectedElement = elements[SAND]
let previousElementBtn

const elementsGrid = document.querySelector('.elements')

Object.entries(elements).forEach(([name, element]) => {
  const btn = document.createElement('button')
  const color = element.color ? `#${element.color.toString(16)}` : ''

  if (name === SAND) {
    previousElementBtn = btn
    btn.classList.add('element-selected')
  }
  btn.textContent = name.toLowerCase()
  btn.classList.add(name.toLowerCase() + '-btn')
  btn.classList.add('element-btn')
  btn.style.background = color

  btn.addEventListener('click', () => {
    previousElementBtn.classList.remove('element-selected')
    btn.classList.add('element-selected')
    previousElementBtn = btn
    return (selectedElement = element)
  })

  elementsGrid.appendChild(btn)
})

const toolSizes = [1, 4, 8, 12]

const toolsGrid = document.querySelector('.tools')

let selectedSize = 4
let previousSize

toolSizes.forEach((tool) => {
  const btn = document.createElement('button')
  btn.classList.add('tool-btn')

  if (selectedSize === tool) {
    previousSize = btn
    btn.classList.add('tool-selected')
  }

  btn.textContent = tool

  btn.addEventListener('click', () => {
    previousSize.classList.remove('tool-selected')
    btn.classList.add('tool-selected')
    previousSize = btn
    return (selectedSize = tool)
  })

  toolsGrid.appendChild(btn)
})

const resetBtn = document.createElement('button')

resetBtn.classList.add('tool-btn')
resetBtn.classList.add('reset-btn')

resetBtn.textContent = 'RESET'

resetBtn.addEventListener('click', () => {
  window.location.reload()
})

toolsGrid.appendChild(resetBtn)

const tickBtn = document.querySelector('#tick')

tickBtn.addEventListener('click', tick)

if (!window.DEBUG) {
  tickBtn.classList.add('hidden')
}

const { canvas: $canvas, cellsLength } = canvas.init()
const canvasBounds = $canvas.getBoundingClientRect()

let drawing = false

const coord = (c) => Math.floor(c / canvas.cellSize)

const getCoords = (e) => {
  let eventX, eventY

  if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend') {
    var touch = e.touches[0] || e.changedTouches[0]
    eventX = touch.pageX
    eventY = touch.pageY
  } else if (
    e.type == 'mousedown' ||
    e.type == 'mouseup' ||
    e.type == 'mousemove'
  ) {
    eventX = e.clientX
    eventY = e.clientY
  }

  const x = coord(eventX - canvasBounds.x)
  const y = coord(eventY - canvasBounds.y)
  console.log(e)

  return selectedSize === 1
    ? [[x, y]]
    : sandpit.getCircularNeighbors(selectedSize, [x, y])
}

const handleDrawing = (e) => {
  getCoords(e).forEach((coords) =>
    sandpit.draw(...coords, selectedElement.make()),
  )
}

$canvas.addEventListener('mousemove', (e) => {
  if (drawing) handleDrawing(e)
})
$canvas.addEventListener('touchmove', (e) => {
  if (drawing) handleDrawing(e)
})
$canvas.addEventListener('click', handleDrawing)
$canvas.addEventListener('mousedown', () => {
  drawing = true
})
$canvas.addEventListener('touchstart', () => {
  drawing = true
  console.log(drawing)
})
$canvas.addEventListener('mouseup', () => {
  drawing = false
})
$canvas.addEventListener('touchend', () => {
  drawing = false
  console.log(drawing)
})

sandpit.init(cellsLength)

const ticker = PIXI.Ticker.shared

if (!window.DEBUG) {
  ticker.add(tick)
}
