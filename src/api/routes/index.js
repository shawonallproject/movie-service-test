const routes = require('express').Router(),
    movieRoutes = require('./movieRoutes');
    
routes.use('/movies', movieRoutes)

module.exports = routes