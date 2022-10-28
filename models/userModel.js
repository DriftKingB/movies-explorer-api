const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    match: /^.+@.+\..+$/,
    required: true,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new AuthError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
