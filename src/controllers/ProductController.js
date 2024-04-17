const ProductService = require('../services/ProductService');
//register
const createProduct = async (req, res) => {
  try {
    console.log('mess userController:', req.body);

    const { name, image, type, price, countInStock, rating, description } = req.body;

    if (!name || !image || !type || !price || !countInStock || !rating) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Có 1 trường trong sản phẩm chưa được thêm',
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const data = req.body;
    console.log(data);
    if (!idProduct) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The item dose not exists',
      });
    }
    const response = await ProductService.updateProduct(idProduct, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The item dose not exists',
      });
    }
    const response = await ProductService.deleteProduct(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetail = async (req, res) => {
  try {
    const idProduct = req.params.id;
    if (!idProduct) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The item dose not exists',
      });
    }
    const response = await ProductService.getDetail(idProduct);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetail,
  getAllProduct,
};
