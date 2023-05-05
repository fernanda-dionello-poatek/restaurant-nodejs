const users_repository = require("../../repository/users_repository");
const isEmpty = require("lodash/isEmpty");
const crypto = require("crypto");

let err = { message: "", status: 400 };

exports.validateUserLogin = (user) => {
  validateFields(user);
};

validateFields = (user) => {
  if (isEmpty(user)) {
    err.message = "User data is missing.";
    throw err;
  }
  if (!user.username) {
    err.message = "User doesn't have field username";
    throw err;
  }
  if (!user.password) {
    err.message = "User doesn't have field password";
    throw err;
  }
};

exports.validateToken = (token) => {
  if (!token) {
    err.message = "Access token is missing.";
    throw err;
  }
};

exports.validateUser = (userFounded, userBody) => {
  if (userFounded.rowCount == 0) {
    err = {
      message: `No user with username ${userBody.username} found.`,
      status: 404,
    };
    throw err;
  }

  let encryptPassword = crypto.createHash("sha1");
  encryptPassword.update(userBody.password);

  if (userFounded.rows[0].password !== encryptPassword.digest("hex")) {
    err = { message: "Password incorrect.", status: 401 };
    throw err;
  }
};

exports.validateUserId = async (id) => {
  const userSelected = await users_repository.getUserById(id);
  if (userSelected.rowCount == 0) {
    err = { message: `No user with id ${id} found.`, status: 404 };
    throw err;
  }
};

exports.validateUserUpdate = async (user, id) => {
  await this.validateUserId(id);
  if (isEmpty(user)) {
    err.message = "User data is missing.";
    throw err;
  } else if (!user.username) {
    err.message = "User must have username field.";
    throw err;
  }
};
