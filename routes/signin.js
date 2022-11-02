const router = require('express').Router();

const { handleLogin } = require('../controllers/login');
const { validateUserSignin } = require('../middlewares/requestValidation');

router.post('/', validateUserSignin, handleLogin);

module.exports = router;
