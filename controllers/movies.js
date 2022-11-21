const Movie = require('../models/movieModel');
const ValidationError = require('../errors/ValidationError');

Movie.syncIndexes();

function getMovies(req, res, next) {
  const owner = req.user;

  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
}

function createMovie(req, res, next) {
  const owner = req.user;
  const {
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации mongoose'));
        return;
      }
      next(err);
    });
}

function removeMovie(req, res, next) {
  const { user, params } = req;
  Movie.checkUserRights(params.id, user._id)
    .then((movie) => {
      Movie.findOneAndDelete({ id: movie.id })
        .then((mov) => {
          res.send({ data: mov });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указан некорректный id'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
};
