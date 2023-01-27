require('dotenv').config();

function handleLogout(req, res) {
  res.clearCookie('jwt', { sameSite: 'none', secure: true }).send({ message: 'Куки удалены' });
}

module.exports = { handleLogout };
