const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout_controller");

router.get("/table/:id", checkoutController.checkoutByTableId);
router.get("/order_card/:id", checkoutController.checkoutByOrderCardId);
module.exports = router;
