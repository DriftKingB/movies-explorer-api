const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateUserSignup } = require('../middlewares/requestValidation');

router.post('/', validateUserSignup, createUser);

module.exports = router;
