require('dotenv').config();

function handleLogout(req, res) {
  res.clearCookie('jwt').send({ message: 'Куки удалены' });
}

module.exports = { handleLogout };
