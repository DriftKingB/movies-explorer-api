const rateLimiter = require('express-rate-limit');
const { limiterConfig } = require('../utils/constants');

const limiter = rateLimiter(limiterConfig);

module.exports = limiter;
