const router = require('express').Router();
const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieParams } = require('../middlewares/requestValidation');

router.get('/', getMovies);

router.post('/', validateMovie, createMovie);

router.delete('/:movieId', validateMovieParams, removeMovie);

module.exports = router;
