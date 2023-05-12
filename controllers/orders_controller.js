const ordersServices = require("../services/orders_services");
const { returnError } = require("./utils/return_error");

exports.createOrder = async (req, resp) => {
  const order = req.body;
  try {
    await ordersServices.createOrder(order);
    resp.status(201).json("Order created successfully");
  } catch (e) {
    returnError(e, resp);
  }
};

exports.listOrders = async (req, resp) => {
  try {
    const result = await ordersServices.listOrders();
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.getOrderById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await ordersServices.getOrderById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};

exports.deleteOrderById = async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await ordersServices.deleteOrderById(id);
    resp.json(result);
  } catch (e) {
    returnError(e, resp);
  }
};