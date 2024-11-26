import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generate.token.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email.',
      });
    }

    const hashedPassword = bcrypt.hash(password, 10, (err, hash) => {});
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to register' });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email or password' });
    }
    const isPasswordMatch = bcrypt.compare(
      password,
      user.password,
      function (err, result) {}
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email or password' });
    }
    generateToken(res,user,`Welcome back ${user.name}`);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to login' });
    console.log(error.message);
  }
};
