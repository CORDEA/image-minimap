import { DragGesture, PinchGesture } from '@use-gesture/vanilla'

const params = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

const img = new Image()

function draw() {
  img.onload = imageOnLoad
  img.src = 'assets/image.jpg'
}

function imageOnLoad() {
  const main = document.getElementById('main')
  const minimap = document.getElementById('minimap')
  const aspectRatio = img.width / img.height
  const width = main.height * aspectRatio
  params.width = width
  params.height = main.height
  main.width = width
  minimap.width = minimap.height * aspectRatio

  new DragGesture(main, (state) => {
    if (!state.active) {
      return
    }
    params.x += state.delta[0]
    params.y += state.delta[1]
  })
  new PinchGesture(main, (state) => {
    const scale = state.offset[0]
    const move = state.movement[0]
    const width = main.height * aspectRatio * scale
    const height = main.height * scale
    let memo = state.memo
    if (state.first) {
      const cx = params.x + width / 2
      const cy = params.y + height / 2
      memo = [cx - state.origin[0], cy - state.origin[1]]
    }
    params.x = move * memo[0] + (state.origin[0] - width / 2)
    params.y = move * memo[1] + (state.origin[1] - height / 2)
    params.width = width
    params.height = height
    return memo
  })

  animate()
}

function animate() {
  requestAnimationFrame(animate)
  animateMain()
  animateMinimap()
}

function animateMain() {
  const canvas = document.getElementById('main')
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(img, params.x, params.y, params.width, params.height)
}

function animateMinimap() {
  const main = document.getElementById('main')
  const canvas = document.getElementById('minimap')
  const context = canvas.getContext('2d')
  context.drawImage(img, 0, 0, canvas.width, canvas.height)

  const x = (Math.max(-params.x, 0) * canvas.width) / params.width
  const y = (Math.max(-params.y, 0) * canvas.height) / params.height
  const width = (canvas.width * main.width) / params.width
  const height = (canvas.height * main.height) / params.height
  context.strokeStyle = 'red'
  context.strokeRect(x, y, width, height)
}

window.onload = draw
