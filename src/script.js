const atualiza = () => {}

const loop = () => {
  atualiza()
  renderiza()
  setTimeout(loop, 100)
}

const tela = document.querySelector('.tela')

const renderiza = () => {}

loop()
