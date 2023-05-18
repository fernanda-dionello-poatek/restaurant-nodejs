exports.groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
};

exports.getAmount = (orders) => {
  const initialValue = 0;
  return orders.reduce(
    (acc, order) => acc + order.price,
    initialValue
  );
}

exports.mapToOrderCardResponse = (orders) => {
  return orders.map(({
    id, 
    product_qty, 
    created_on, 
    name, 
    price, 
    username, 
    order_card
  }) => {
    return {
      orderId: id,
      userName: username,
      productName: name,
      productQuantity: product_qty,
      productPrice: price,
      createdOn: created_on,
      orderCard: order_card
    }
  })
}

exports.mapOrdersGroupByOrderCard = (entries) => {
  return entries.map((entry) => {
      return {
      orderCard: entry[0],
      orderCardAmount: this.getAmount(entry[1]),
      orderCardOrders: this.mapToOrderCardResponse(entry[1]),
    }});
}

exports.mapOrdersToTableCheckoutResponse = (orders) => {
  const totalAmount = this.getAmount(orders);
  const groupByOrderCard = this.groupBy(orders, "order_card");

  const tableOrders = this.mapOrdersGroupByOrderCard(Object.entries(groupByOrderCard));
  return {
    totalAmount,
    tableOrders
  };
}