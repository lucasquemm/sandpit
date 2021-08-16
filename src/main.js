import * as world from './world'

const loop = () => {
  world.update()
  render()
  // setTimeout(loop, 100)
}

const canvas = document.querySelector('#canvas')

const render = () => {}

world.init()
loop()

window.loop = loop
window.world = world
