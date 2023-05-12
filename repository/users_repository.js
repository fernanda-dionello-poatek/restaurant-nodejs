const { pool } = require("../configs/db_connection");

exports.findUsername = async (username) => {
  const bd = await pool.connect();
  const values = [username];
  try {
    return await bd.query("SELECT * FROM users WHERE username = $1", values);
  } catch (err) {
    throw err;
  } finally {
    bd.release();
  }
};

exports.getUsers = async () => {
  const bd = await pool.connect();

  try {
    return await bd.query("SELECT * FROM users");
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.getUserById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`SELECT * FROM users WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.deleteUserById = async (id) => {
  const bd = await pool.connect();
  const values = [id];

  try {
    return await bd.query(`DELETE FROM users WHERE id=$1`, values);
  } catch (e) {
    throw e;
  } finally {
    bd.release();
  }
};

exports.updateUserById = async (id, user) => {
  const bd = await pool.connect();
  const values = [user.username, id];
  try {
    await bd.query("BEGIN");
    await bd.query(
      `UPDATE users SET username=$1 WHERE id=$2 RETURNING *`,
      values
    );
    await bd.query("COMMIT");
  } catch (err) {
    await bd.query("ROLLBACK");
    if ((err.code = 23505)) {
      err = {
        message: "Cannot update to an user that already exists in users table.",
        status: 403,
      };
    }
    throw err;
  } finally {
    bd.release();
  }
};

exports.createUser = async (user, pwd) => {
  const bd = await pool.connect();
  const values = [user.username, pwd];
  try {
    await bd.query("BEGIN");
    await bd.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      values
    );
    await bd.query("COMMIT");
  } catch (err) {
    await bd.query("ROLLBACK");
    if ((err.code = 23505)) {
      err = {
        message:
          "Cannot create duplicated user, it already exists in users table.",
        status: 403,
      };
    }
    throw err;
  } finally {
    bd.release();
  }
};
