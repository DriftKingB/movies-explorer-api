require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { customErrorHandler, celebrateErrorHandler } = require('./middlewares/errorHandlers');
const { corsConfig } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb_dev', {
  useNewUrlParser: true,
});

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsConfig));
app.use(helmet());
app.use(limiter());

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(customErrorHandler);
