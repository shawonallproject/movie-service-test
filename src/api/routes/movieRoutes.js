const routes = require('express').Router()
const movieController = require('../controllers/MovieController')
const authMiddleware = require('../middlewares/authMiddleware')

routes.post('/',authMiddleware.verifyToken, movieController.create)
routes.get('/',authMiddleware.verifyToken, movieController.findByUser)

module.exports = routes