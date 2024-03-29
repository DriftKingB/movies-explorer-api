const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const NotFoundError = require('../errors/NotFoundError');
const KeyDublicateError = require('../errors/KeyDublicateError');
const ValidationError = require('../errors/ValidationError');

User.syncIndexes();

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => User.create({
      name, password: hash, email,
    })
      .then(() => next())
      .catch((err) => {
        if (err.code === 11000) {
          next(new KeyDublicateError('Пользователь с таким email уже существует'));
          return;
        } if (err.name === 'ValidationError') {
          next(new ValidationError('Ошибка валидации mongoose'));
          return;
        }
        next(err);
      }));
}

function updateUser(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new KeyDublicateError('Пользователь с таким email уже существует'));
        return;
      } if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации mongoose'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
};
