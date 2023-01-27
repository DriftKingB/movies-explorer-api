const router = require('express').Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/requestValidation');

router.get('/me', getCurrentUser);

router.patch('/me', validateUserInfo, updateUser);

module.exports = router;
