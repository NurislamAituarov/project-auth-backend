const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, Email) => {
  const payload = {
    id,
    Email,
  };
  return jwt.sign(payload, secret, { expiresIn: '0.1h' });
};

class AuthController {
  async registration(req, res, next) {
    const { FirstName, LastName, Email, Password } = req.body;
    const candidate = await User.findOne({ Email });
    if (candidate) {
      return res
        .status(403)
        .json({ massage: `User with ${Email} this email address already exists ` });
    }

    const hasPassword = bcrypt.hashSync(Password, 7);
    const user = new User({
      FirstName,
      LastName,
      Email,
      Password: hasPassword,
    });

    await user.save();
    const response = {
      RequestId: user._id,
      Amount: user.FirstName,
    };

    res.json({ massage: 'Пользователь успешно зарегистрирован' });
    try {
    } catch (err) {
      console.log(err);
      res.status(400).json({ massage: 'Registration error' });
    }
  }

  async login(req, res, next) {
    try {
      const { Email, Password } = req.body;
      const user = await User.findOne({ Email });

      if (!user) {
        return res.status(400).json({ massage: `Email ${Email} not registered` });
      }

      const validPassword = bcrypt.compareSync(Password, user.Password);
      if (!validPassword) {
        return res.status(400).json({ massage: 'Wrong password entered' });
      }

      const token = generateAccessToken(user._id, user.Email);

      res.cookie('token', token, { maxAge: 1000000, httpOnly: true });
      return res.json({ token, user });
    } catch (err) {
      res.status(400).json({ massage: 'Server error' });
    }
  }

  async auth(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const token = generateAccessToken(user._id, user.Email);
      return res.json({ token, user });
    } catch (err) {
      res.status(400).json({ massage: 'Server error' });
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {}
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.json('delete');
  }
}

module.exports = new AuthController();
