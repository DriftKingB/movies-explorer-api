require('dotenv').config();

function handleLogout(req, res) {
  res.clearCookie('jwt', { sameSite: 'none' }).send({ message: 'Куки удалены' });
}

module.exports = { handleLogout };
