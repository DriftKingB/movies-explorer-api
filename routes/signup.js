const router = require('express').Router();

const { handleLogin } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { validateUserSignup } = require('../middlewares/requestValidation');

router.post('/', validateUserSignup, createUser, handleLogin);

module.exports = router;
