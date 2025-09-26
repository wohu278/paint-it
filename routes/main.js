const {Router} = require('express')
require('dotenv').config()

const router = Router()

router.get('/', (req, res) => {

    res.render('home')

})

module.exports = router