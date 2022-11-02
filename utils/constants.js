const urlRegEx = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const corsConfig = {
  origin: [
    'http://localhost:3000',
    'https://removie.students.nomoredomains.icu',
    'http://removie.students.nomoredomains.icu',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const validationConfig = {
  abortEarly: false,
  errors: { wrap: { label: false } },
  messages: {
    'any.required': '{#label}: поле - обязательно',
    'string.empty': '{#label}: поле не может быть пустым',
    'string.pattern.base': '{#label}: некорректный формат',
    'string.min': '{#label}: поле слишком короткое (минимум - {#limit} символа)',
    'string.max': '{#label}: поле слишком длинное (максимум - {#limit} символов)',
    'string.email': '{#label}: некорректный формат почты',
    '*': '{#label}: поле - лишнее',
  },
};

const limiterConfig = {
  windowMs: 5 * 60 * 1000, // 5m
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Слишком много запросов, попробуйте позже' },
};

module.exports = {
  urlRegEx, validationConfig, corsConfig, limiterConfig,
};
