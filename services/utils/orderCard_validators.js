const order_cards_repository = require("../../repository/order_cards_repository");

let err = { message: "", status: 400 };

exports.validateOrderCardId = async (id) => {
  const orderCardSelected =
    await order_cards_repository.getOrderCardByCardNumber(id);
  if (orderCardSelected.rowCount == 0) {
    err = {
      message: `No order card with id ${id} found.`,
      status: 404,
    };
    throw err;
  }
};
