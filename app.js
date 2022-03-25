/*=====================================
* Include packages
* ===================================*/
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

/*=================================
* app configuration
* ================================*/
const app = express()
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(bodyParser.json({ limit: '100mb' }))
app.use(cors());

/*=================================
* mongodb configuration
* ================================*/
mongooseOptions = {
    useNewUrlParser: true
}
mongoose.connect(process.env.DATABASE, mongooseOptions, (error) => {
    if (error) {
        console.log('DB connection failed')
    } else {
        console.log('DB connected ')
    }
})


/*=================================
* routes
* ================================*/
const routes = require('./src/api/routes')
app.use('/', routes)


const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Movie Service app listening on port ${PORT}`))