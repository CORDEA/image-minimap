import {DragGesture, PinchGesture} from "@use-gesture/vanilla";

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
    new PinchGesture(canvas, (state) => {
        const scale = state.offset[0]
        const move = state.movement[0]
        const width = canvas.height * aspectRatio * scale
        const height = canvas.height * scale
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
