const { pool } = require("../configs/db_connection");

exports.createOrder = async (order) => {
  const bd = await pool.connect();
  const values = [
    order.user_id,
    order.table_id,
    order.product_id,
    order.order_card,
    order.product_qty,
  ];
  try {
    await bd.query("BEGIN");
    await bd.query(
      "INSERT INTO orders (user_id, table_id, product_id, order_card, product_qty) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values
    );
    await bd.query("COMMIT");
  } catch (err) {
    await bd.query("ROLLBACK");
    if ((err.code = 23505)) {
      err = {
        message:
          "Cannot create duplicated order, it already exists in orders table.",
        status: 403,
      };
    }
    throw err;
  } finally {
    bd.release();
  }
};

exports.getOrders = async () => {
  const bd = await pool.connect();

  try {
    return await bd.query("SELECT * FROM orders");
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.getOrderById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`SELECT * FROM orders WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.deleteOrderById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`DELETE FROM orders WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};
