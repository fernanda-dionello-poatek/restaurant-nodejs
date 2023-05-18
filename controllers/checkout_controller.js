const checkoutServices = require("../services/checkout_services");
const { returnError } = require("./utils/return_error");

exports.checkoutByTableId = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await checkoutServices.checkoutByTableId(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.checkoutByOrderCardId = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await checkoutServices.checkoutByOrderCardId(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};