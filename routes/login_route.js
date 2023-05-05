const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users_controller");

router.post("/", users_controller.userValidation);

module.exports = router;
