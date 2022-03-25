const routes = require('express').Router()
const movieController = require('../controllers/MovieController')

routes.post('/', movieController.create)
routes.get('/', movieController.findAll)

module.exports = routes

