const { celebrate, Joi } = require('celebrate');
const { urlRegEx, validationConfig } = require('../utils/constants');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegEx),
    trailerLink: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}, validationConfig);

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, validationConfig);

const validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, validationConfig);

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}, validationConfig);

const validateMovieParams = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
}, {
  messages: { '*': 'Указан некорректный id' },
});

module.exports = {
  validateMovie,
  validateUserSignup,
  validateUserSignin,
  validateUserInfo,
  validateMovieParams,
};
