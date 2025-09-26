const express = require("express")
const morgan = require("morgan")
const ejs = require("ejs")
const path = require("path")
const mainRoute = require("./routes/main.js")
require("dotenv").config()

const app = express()

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '/routes/views'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mainRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`);
    
})