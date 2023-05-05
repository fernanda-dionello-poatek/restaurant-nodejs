const usersServices = require("../services/users_services");
const { returnError } = require("./utils/return_error");

exports.userValidation = async (req, resp) => {
  const user = req.body;
  try {
    const token = await usersServices.userValidation(user);
    resp.status(201).json({ token: token });
  } catch (e) {
    returnError(e, resp);
  }
};

exports.tokenValidation = (req, resp, next) => {
  const token = req.get("x-session-token");
  try {
    usersServices.tokenValidation(token, next);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.listUsers = async (req, resp) => {
  try {
    const result = await usersServices.listUsers();
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.getUserById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await usersServices.getUserById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await usersServices.deleteUserById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.updateUserById = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await usersServices.updateUserById(id, user);
    resp.json("Author updated successfully");
  } catch (e) {
    returnError(e, resp);
  }
};
