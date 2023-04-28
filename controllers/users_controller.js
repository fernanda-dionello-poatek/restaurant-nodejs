const usersServices = require('../services/users_services');
const { returnError } = require('./utils/return_error');

exports.listUsers = async (req, resp) => {
  try {
    const result = await usersServices.listUsers();
    resp.json(result);

  } catch (e) {
    returnError(e, resp); 
  }
}