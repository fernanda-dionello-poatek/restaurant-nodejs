const { pool } = require("../configs/db_connection");

exports.getTableById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`SELECT * FROM tables WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};
