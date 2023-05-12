const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders_controller");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.listOrders);
router.get("/:id", ordersController.getOrderById);
router.delete("/:id", ordersController.deleteOrderById);
module.exports = router;
