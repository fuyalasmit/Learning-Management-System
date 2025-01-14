import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generate.token.js';
import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js';

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
    //could also be used as:
    // bcrypt.hash(password, 10, async (err, hashedPassword) => {
    //   if (err) {
    //     return res.status(500).json({ success: false, message: 'Error hashing password' });
    //   }
    //   await User.create({
    //     name,
    //     email,
    //     password: hashedPassword,
    //   });
    //   return res
    //     .status(201)
    //     .json({ success: true, message: 'Account created successfully' });
    // });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: 'Account Created Successfully' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to Register' });
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
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email or password' });
    }
    return generateToken(res, user, `Welcome Back ${user.name}`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: 'Failed to Login' });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie('token', '', { maxAge: 0 })
      .json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to Logout' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Profile not found' });
    }
    return res.status(200).json({ succes: true, user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to load user' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file; // Uploaded file from Multer  
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    //extracting public ID of old img from url if exists
    if (user.photoURL) {
      const publicId = user.photoURL.split('/').pop().split('.')[0]; //extract publicID
      deleteMediaFromCloudinary(publicId);
    }
    //uploading new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);  
    const photoURL = cloudResponse.secure_url;
    const updatedData = { name, photoURL };  
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select('-password');
    return res
      .status(200)
      .json({
        succes: true,
        user: updatedUser,
        message: 'Profile updated successfully',
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update profile' });
  }
};
