const products_repository = require("../../repository/products_repository");
const users_repository = require("../../repository/users_repository");
const tables_repository = require("../../repository/tables_repository");
const order_cards_repository = require("../../repository/order_cards_repository");
const orders_repository = require("../../repository/orders_repository");
const isEmpty = require("lodash/isEmpty");
const crypto = require("crypto");

let err = { message: "", status: 400 };

exports.validateFields = async (order) => {
  if (isEmpty(order)) {
    err.message = "Order data is missing.";
    throw err;
  }
  if (order.user_id == undefined) {
    err.message = "Order doesn't have field user_id";
    throw err;
  } else {
    const userSelected = await users_repository.getUserById(order.user_id);
    if (userSelected.rowCount == 0) {
      err = { message: `No user with id ${order.user_id} found.`, status: 404 };
      throw err;
    }
  }
  if (order.table_id == undefined) {
    err.message = "Order doesn't have field table_id";
    throw err;
  } else {
    const tableSelected = await tables_repository.getTableById(order.table_id);
    if (tableSelected.rowCount == 0) {
      err = {
        message: `No table with id ${order.table_id} found.`,
        status: 404,
      };
      throw err;
    }
  }
  if (order.product_id == undefined) {
    err.message = "Order doesn't have field product_id";
    throw err;
  } else {
    const productSelected = await products_repository.getProductById(
      order.product_id
    );
    if (productSelected.rowCount == 0) {
      err = {
        message: `No product with id ${order.product_id} found.`,
        status: 404,
      };
      throw err;
    }
  }
  if (order.order_card == undefined) {
    err.message = "Order doesn't have field order_card";
    throw err;
  } else {
    const orderCardSelected =
      await order_cards_repository.getOrderCardByCardNumber(order.order_card);
    if (orderCardSelected.rowCount == 0) {
      err = {
        message: `No order card with id ${order.order_card} found.`,
        status: 404,
      };
      throw err;
    }
  }
  if (order.product_qty == undefined) {
    err.message = "Order doesn't have field product_qty";
    throw err;
  }
};

exports.validateOrderId = async (id) => {
  const orderSelected = await orders_repository.getOrderById(id);
  if (orderSelected.rowCount == 0) {
    err = { message: `No order with id ${id} found.`, status: 404 };
    throw err;
  }
};
