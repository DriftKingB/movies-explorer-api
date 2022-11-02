const rateLimiter = require('express-rate-limiter');
const { limiterConfig } = require('../utils/constants');

const limiter = rateLimiter(limiterConfig);

module.exports = limiter;
