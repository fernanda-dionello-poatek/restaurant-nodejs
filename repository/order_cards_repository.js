const { pool } = require("../configs/db_connection");

exports.getOrderCardByCardNumber = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`SELECT * FROM order_cards WHERE card=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};
