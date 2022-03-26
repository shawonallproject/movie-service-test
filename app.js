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
const mongooseOptions = {
    useNewUrlParser: true
}
let tryCount = 0;
function connectDb() {
    // due to mongo container starting delay, sometimes mongoose failed to connect. Retry solved the issue.
    mongoose.connect(process.env.DATABASE, mongooseOptions, (error) => {
        if (error) {
            console.log('DB connection failed')
            tryCount += 1;
            if (tryCount < 5) {
                setTimeout(() => {
                    connectDb();
                }, 1000);
            }
        } else {
            console.log('DB connected ')
        }
    });
}
connectDb();

/*=================================
* routes
* ================================*/
const routes = require('./src/api/routes')
app.use('/', routes)


const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Movie Service app listening on port ${PORT}`))