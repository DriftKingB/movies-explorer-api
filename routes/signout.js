const router = require('express').Router();
const { handleLogout } = require('../controllers/logout');

router.post('/', handleLogout);

module.exports = router;
