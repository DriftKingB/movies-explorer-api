const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));
router.use('/signout', require('./signout'));

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Указан некорректный путь'));
});
module.exports = router;
