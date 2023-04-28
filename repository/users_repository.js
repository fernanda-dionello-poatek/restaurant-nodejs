const { pool } = require('../configs/db_connection');

exports.getUsers = async () => {
  const bd = await pool.connect();

  try {
    return await bd.query('SELECT * FROM users');
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
}