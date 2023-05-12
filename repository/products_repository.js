const { pool } = require("../configs/db_connection");

exports.findProductByName = async (name) => {
  const bd = await pool.connect();
  const values = [name];
  try {
    return await bd.query("SELECT * FROM products WHERE name = $1", values);
  } catch (err) {
    throw err;
  } finally {
    bd.release();
  }
};

exports.getProducts = async () => {
  const bd = await pool.connect();

  try {
    return await bd.query("SELECT * FROM products");
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.getProductById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`SELECT * FROM products WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.deleteProductById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`DELETE FROM products WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.updateProductById = async (id, product) => {
  const bd = await pool.connect();
  const values = [id];
  let query = 'UPDATE products SET ';
  if(product.name && !product.price){
    values.push(product.name);
    query = query.concat('name=$2');
  }
  if(product.price && !product.name){
    values.push(product.price);
    query = query.concat('price=$2');
  }
  if(product.name && product.price){
    values.push(product.name, product.price);
    query = query.concat('name=$2, price=$3');
  }
  query = query.concat(' WHERE id=$1 RETURNING *')
  try {
    await bd.query("BEGIN");
    await bd.query(
      query,
      values
    );
    await bd.query("COMMIT");
  } catch (err) {
    await bd.query("ROLLBACK");
    if ((err.code = 23505)) {
      err = {
        message:
          "Cannot update to an product that already exists in products table.",
        status: 403,
      };
    }
    throw err;
  } finally {
    bd.release();
  }
};

exports.createProduct = async (product) => {
  const bd = await pool.connect();
  const values = [product.name, product.price];
  try {
    await bd.query("BEGIN");
    await bd.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      values
    );
    await bd.query("COMMIT");
  } catch (err) {
    await bd.query("ROLLBACK");
    if ((err.code = 23505)) {
      err = {
        message:
          "Cannot create duplicated product, it already exists in products table.",
        status: 403,
      };
    }
    throw err;
  } finally {
    bd.release();
  }
};
