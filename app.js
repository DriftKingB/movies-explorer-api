const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const login = require('./routes/signin');
const signup = require('./routes/signup');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { customErrorHandler, celebrateErrorHandler } = require('./middlewares/errorHandlers');
const { corsConfig } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsConfig));

app.use('/signin', login);
app.use('/signup', signup);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Указан некорректный путь'));
});

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(customErrorHandler);
