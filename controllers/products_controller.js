const productsServices = require("../services/products_services");
const { returnError } = require("./utils/return_error");

exports.listProducts = async (req, resp) => {
  try {
    const result = await productsServices.listProducts();
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.getProductById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await productsServices.getProductById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.deleteProductById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await productsServices.deleteProductById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.updateProductById = async (req, resp) => {
  try {
    const { id } = req.params;
    const product = req.body;
    await productsServices.updateProductById(id, product);
    resp.json("Product updated successfully");
  } catch (e) {
    returnError(e, resp);
  }
};

exports.createProduct = async (req, resp) => {
  const product = req.body;
  try {
    await productsServices.createProduct(product);
    resp.status(201).json("Product created successfully");
  } catch (e) {
    returnError(e, resp);
  }
};
