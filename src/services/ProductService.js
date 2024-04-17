const Product = require('../models/ProductModel');
const User = require('../models/ProductModel');
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: 'OK',
          message: 'Mặt hàng này đã tồn tại',
        });
      }
      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      console.log('create product:', createProduct);
      if (createProduct) {
        resolve({
          status: 'OK',
          message: 'success',
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const idProduct = await Product.findOne({
        _id: id,
      });
      if (idProduct === null) {
        resolve({
          status: 'OK',
          message: 'The item does not exists',
        });
      }
      const update = await Product.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: 'OK',
        message: 'Success update',
        data: update,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: 'OK',
          message: 'The item does not exists',
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: 'OK',
        message: 'success delete',
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: 'OK',
          message: 'the item does not exists',
        });
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllProduct = async (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();

      console.log(limit, page, sort, filter);
      const pageCurrent = parseInt(page) + 1 || 1;
      if (filter) {
        const label = filter[0];
        const productsFilter = await Product.find({ [label]: { $regex: filter[1] } })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: 'OK',
          message: 'Success',
          data: productsFilter,
          total: totalProduct,
          pageCurrent,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort && sort.length === 2) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const productsSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objSort);
        resolve({
          status: 'OK',
          message: 'Success',
          data: productsSort,
          totalProduct,
          pageCurrent,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      const products = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: 'asc' });

      resolve({
        status: 'OK',
        message: 'Success',
        data: products,
        total: totalProduct,
        pageCurrent,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetail,
  getAllProduct,
};
