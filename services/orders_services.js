const ordersRepository = require("../repository/orders_repository");
const orders_validators = require("./utils/orders_validators");

exports.createOrder = async (order) => {
  try {
    await orders_validators.validateFields(order);

    const orderCreated = await ordersRepository.createOrder(order);
    return await orderCreated;
    return;
  } catch (err) {
    throw err;
  }
};

exports.listOrders = async () => {
  try {
    const orders = ordersRepository.getOrders();
    return (await orders).rows;
  } catch (e) {
    throw e;
  }
};

exports.getOrderById = async (id) => {
  try {
    await orders_validators.validateOrderId(id);
    const orders = ordersRepository.getOrderById(id);

    return (await orders).rows[0];
  } catch (e) {
    throw e;
  }
};

exports.deleteOrderById = async (id) => {
  try {
    await orders_validators.validateOrderId(id);
    const orders = ordersRepository.deleteOrderById(id);
    return (await orders).rows[0];
  } catch (e) {
    throw e;
  }
};
