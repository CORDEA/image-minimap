import {DragGesture} from "@use-gesture/vanilla";

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
    const canvas = document.getElementById("canvas");
    const aspectRatio = img.width / img.height
    const width = canvas.height * aspectRatio
    const height = canvas.height
    params.width = width
    params.height = height

    new DragGesture(canvas, (state) => {
        if (!state.active) {
            return
        }
        params.x += state.delta[0]
        params.y += state.delta[1]
    })

    animate()
}

function animate() {
    requestAnimationFrame(animate)
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
        img,
        params.x,
        params.y,
        params.width,
        params.height
    )
}

window.onload = draw
