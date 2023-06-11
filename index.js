function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image()
    img.onload = () => imageOnLoad(img, ctx)
    img.src = 'assets/image.jpg'
}

function imageOnLoad(img, ctx) {
    ctx.drawImage(img, 0, 0)
}

window.onload = draw
