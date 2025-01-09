const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (username == 'admin' && password == 1234) {
    const token = jwt.sign({ user: username }, process.env.JWT_SECRET);

    res.json({ message: 'Sessión iniciada', username, token });
  } else {
    return res.status(400).json({ message: 'Usuario o contraseña incorrecta' });
  }
};

module.exports = { loginUser };
