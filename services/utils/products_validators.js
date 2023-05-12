const products_repository = require("../../repository/products_repository");
const isEmpty = require("lodash/isEmpty");
const crypto = require("crypto");

let err = { message: "", status: 400 };

exports.validateFields = (product) => {
  if (isEmpty(product)) {
    err.message = "Product data is missing.";
    throw err;
  }
  if (!product.name) {
    err.message = "Product doesn't have field name";
    throw err;
  }
  if (product.price == undefined) {
    err.message = "Product doesn't have field price";
    throw err;
  }
};

exports.validateProduct = (productFounded, productBody) => {
  if (productFounded.rowCount == 0) {
    err = {
      message: `No product with name ${productBody.name} found.`,
      status: 404,
    };
    throw err;
  }
};

exports.validateProductByName = (productFounded, productBody, id) => {
  const filteredProducts = productFounded.rows.filter(
    (product) => product.id != id
  );
  if (filteredProducts.length > 0) {
    err = {
      message: `A product with this name ${productBody.name} already exists.`,
      status: 404,
    };
    throw err;
  }
};

exports.validateProductId = async (id) => {
  const productSelected = await products_repository.getProductById(id);
  if (productSelected.rowCount == 0) {
    err = { message: `No product with id ${id} found.`, status: 404 };
    throw err;
  }
};

exports.validateProductUpdate = async (product, id) => {
  await this.validateProductId(id);
  if (isEmpty(product)) {
    err.message = "Product data is missing.";
    throw err;
  } else if (!product.name && !product.price) {
    err.message = "Product must have either name or price field.";
    throw err;
  }
};
