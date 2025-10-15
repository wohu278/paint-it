const canvas = document.getElementById('drawing-board')
const toolbar = document.getElementById('toolbar')
const contx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let isPainting = false
let lineWidth = 5


function resizeCanvas() {

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

}

window.addEventListener('resize', resizeCanvas)

resizeCanvas()

toolbar.addEventListener('click', e => {

    if(e.target.id === 'clear') {

        contx.clearRect(0, 0, canvas.width, canvas.height)

    }

    if(e.target.id === 'save') {

        const link = document.createElement('a')
        link.download = 'my_paint-it_draw.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
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

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    contx.lineTo(x, y)
    contx.stroke()
    contx.beginPath()
    contx.moveTo(x, y)

}

// Mouse options

canvas.addEventListener('mousedown', o => {

    isPainting = true
    contx.beginPath()
    const rect = canvas.getBoundingClientRect()
    contx.moveTo(o.clientX - rect.left, o.clientY - rect.top)

})

canvas.addEventListener('mouseup', u => {

    isPainting = false
    contx.beginPath()

})

canvas.addEventListener('mousemove', draw)

// Touch options

canvas.addEventListener('touchstart', e => {

    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    isPainting = true
    contx.beginPath()
    contx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top)

})

canvas.addEventListener('touchmove', e => {

    e.preventDefault()
    if(!isPainting) {

        return
    }
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    contx.lineWidth = lineWidth
    contx.lineCap = 'round'
    contx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top)
    contx.stroke()
    contx.beginPath()
    contx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top)

})

canvas.addEventListener('touchend', e => {
    isPainting = false
    contx.beginPath()
})