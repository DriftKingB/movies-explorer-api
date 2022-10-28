const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');
const { urlRegEx } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    match: urlRegEx,
  },

  trailerLink: {
    type: String,
    required: true,
    match: urlRegEx,
  },

  thumbnail: {
    type: String,
    required: true,
    match: urlRegEx,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  nameRu: {
    type: String,
    required: true,
  },

  nameEn: {
    type: String,
    required: true,
  },
});

movieSchema.statics.checkUserRights = function (movieId, userId) {
  return this.findOne({ _id: movieId })
    .orFail(new NotFoundError('Запрашиваемый фильм не найден'))
    .then((movie) => {
      if (movie.owner.equals(userId)) {
        return Promise.resolve(movie);
      }

      return Promise.reject(new PermissionError('У вас нет прав на удаление этого фильма'));
    });
};

module.exports = mongoose.model('movie', movieSchema);
