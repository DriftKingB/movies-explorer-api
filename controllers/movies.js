const Movie = require('../models/movieModel');
const ValidationError = require('../errors/ValidationError');

function getMovies(req, res, next) {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
}

function createMovie(req, res, next) {
  const owner = req.user;
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, nameRu, nameEn,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRu,
    nameEn,
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
  Movie.checkUserRights(params.movieId, user._id)
    .then(({ _id }) => {
      Movie.findByIdAndDelete(_id)
        .then((movie) => {
          res.send({ data: movie });
        });
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
