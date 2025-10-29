//ID elements
const canvas = document.getElementById('drawing-board')
const toolbar = document.getElementById('toolbar')
const brush = document.getElementById('brush')
const eraser = document.getElementById('eraser')
const contx = canvas.getContext('2d')

//Set initial canvas size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//Drawing state
let isPainting = false
let lineWidth = 5
let isErasing = false
let brushColor = '#000000'


//Resize canvas for devices
function resizeCanvas() {

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

}

window.addEventListener('resize', resizeCanvas)

//The resize canvas function is called once to set the correct size at the beginning
resizeCanvas()

//Toolbar options
toolbar.addEventListener('click', e => {

    //Clear canvas
    if(e.target.id === 'clear') {

        contx.clearRect(0, 0, canvas.width, canvas.height)

    }

    //Save image
    if(e.target.id === 'save') {

        const link = document.createElement('a')
        link.download = 'my_paint-it_draw.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    }

})

//Change stroke color and line width
toolbar.addEventListener('change', i => {

    if(i.target.id === 'stroke') {

        brushColor = i.target.value

        if(!isErasing) {
            contx.strokeStyle = brushColor
        }

    }

    if(i.target.id === 'lineWidth') {

        lineWidth = i.target.value

    }

})

//Brush tool
brush.addEventListener('click', e => {

    isErasing = false
    contx.globalCompositeOperation = 'source-over'
    contx.strokeStyle = brushColor
    brush.classList.add('active')
    eraser.classList.remove('active')

})

//Eraser tool
eraser.addEventListener('click', e => {

    isErasing = true
    contx.globalCompositeOperation = 'destination-out'
    contx.lineWidth = lineWidth
    eraser.classList.add('active')
    brush.classList.remove('active')

})

//Drawing function
const draw = e => {

    if(!isPainting) {

        return

    }

    //Set drawing options
    contx.lineWidth = lineWidth
    contx.lineCap = 'round'

    //Get mouse position
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    //Draw line
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