const update = () => {}

const loop = () => {
  update()
  render()
  setTimeout(loop, 100)
}

const canvas = document.querySelector('#canvas')

const render = () => {}

loop()
