const canvas = document.getElementById('drawing-board')
const toolbar = document.getElementById('toolbar')
const contx = canvas.getContext('2d')

const canvasOffsetX = canvas.offsetLeft
const canvasOffsetY = canvas.offsetTop

canvas.width = window.innerWidth - canvasOffsetX
canvas.height = window.innerHeight - canvasOffsetY

let isPainting = false
let lineWidth = 5
// let startX
// let startY

toolbar.addEventListener('click', e => {

    if(e.target.id === 'clear') {

        contx.clearRect(0, 0, canvas.width, canvas.height)

    }

})

toolbar.addEventListener('change', i => {

    if(i.target.id === 'stroke') {

        contx.strokeStyle = i.target.value

    }

    if(i.target.id === 'lineWidth') {

        lineWidth = i.target.value

    }

})

const draw = e => {

    if(!isPainting) {

        return

    }

    contx.lineWidth = lineWidth
    contx.lineCap = 'round'

    contx.lineTo(e.clientX - canvasOffsetX, e.clientY)
    contx.stroke()
    contx.beginPath()
    contx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY)

}

canvas.addEventListener('mousedown', o => {

    isPainting = true
    contx.beginPath()
    contx.moveTo(o.clientX - canvasOffsetX, o.clientY - canvasOffsetY)

})

canvas.addEventListener('mouseup', u => {

    isPainting = false
    contx.beginPath()

})

canvas.addEventListener('mousemove', draw)

function resizeCanvas() {

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

}

window.addEventListener('resize', resizeCanvas)

resizeCanvas()