const productsRepository = require("../repository/products_repository");
const products_validators = require("./utils/products_validators");

exports.listProducts = async () => {
  try {
    const products = productsRepository.getProducts();
    return (await products).rows;
  } catch (e) {
    throw e;
  }
};

exports.getProductById = async (id) => {
  try {
    await products_validators.validateProductId(id);
    const products = productsRepository.getProductById(id);

    return (await products).rows[0];
  } catch (e) {
    throw e;
  }
};

exports.deleteProductById = async (id) => {
  try {
    await products_validators.validateProductId(id);
    const products = productsRepository.deleteProductById(id);
    return (await products).rows[0];
  } catch (e) {
    throw e;
  }
};

exports.updateProductById = async (id, product) => {
  try {
    await products_validators.validateProductUpdate(product, id);
    const productFounded = await productsRepository.findProductByName(
      product.name
    );
    products_validators.validateProductByName(productFounded, product, id);
    const products = await productsRepository.updateProductById(id, product);
    return await products;
  } catch (e) {
    throw e;
  }
};

exports.createProduct = async (product) => {
  try {
    products_validators.validateFields(product);
    const productFounded = await productsRepository.findProductByName(
      product.name
    );
    products_validators.validateProductByName(productFounded, product);

    const productCreated = await productsRepository.createProduct(product);
    return await productCreated;
    return;
  } catch (err) {
    throw err;
  }
};
