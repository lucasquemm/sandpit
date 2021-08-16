import * as world from './world'
import { draw } from './canvas'

const loop = () => {
  world.update()
  draw(world)
  // setTimeout(loop, 100)
}

const canvas = document.querySelector('#canvas')

world.init()
loop()

window.loop = loop
window.world = world
