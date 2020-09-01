const express = require('express')
const searchRouter = express.Router()

const user_moviesController = require('../controllers/user_movies-controller')
const user_seriesController = require('../controllers/user_series-controller')
const searchController = require('../controllers/search-controller')
const { initialUnPack } = require('../services/find/find')


searchRouter.get('/', user_moviesController.index, user_seriesController.index, (req, res) => {
    res.json({
        message: 'ok',
        data: {
            movies: res.locals.userMovies,
            series: res.locals.userSeries,
        }
    })
})


searchRouter.post('/:title([a-zA-Z]+)', initialUnPack, searchController.results)
// searchRouter.post('/:id([0-9]+)', searchController.decide) // will need the search fetches

module.exports = searchRouter