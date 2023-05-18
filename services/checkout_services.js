const ordersRepository = require("../repository/orders_repository");
const table_validators = require("./utils/table_validators");
const order_card_validators = require("./utils/orderCard_validators");
const checkout_utils = require("./utils/checkout_utils");

exports.checkoutByTableId = async (id) => {
  try {
    await table_validators.validateTableId(id);
    const tableCheckout = await ordersRepository.getTableCheckoutById(id);
    return checkout_utils.mapOrdersToTableCheckoutResponse(tableCheckout.rows);
  } catch (e) {
    throw e;
  }
};

exports.checkoutByOrderCardId = async (id) => {
  try {
    await order_card_validators.validateOrderCardId(id);
    // const orderCardCheckout = ordersRepository.getOrderCardCheckoutById(id);

    return;
  } catch (e) {
    throw e;
  }
};