const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./jwtService');

//register
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser != null) {
        resolve({
          status: '1',
          message: 'the email is already',
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        confirmPassword: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: 'OKE',
          message: 'success',
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//login
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'the user is not defined',
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: 'ERR',
          message: 'the password or user is not correct',
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: 'OKE',
        message: 'success',
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//update user
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'the user is not defined',
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: 'OKE',
        message: 'success',
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//delete user
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'the user is not defined',
        });
      }
      await User.findByIdAndDelete(id);
      resolve({
        status: 'OKE',
        message: 'delete user success',
        // data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//get all user
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: 'OK',
        message: 'Success',
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined',
        });
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};
