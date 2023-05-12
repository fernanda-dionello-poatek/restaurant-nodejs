const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

router.get("/", usersController.listUsers);
router.get("/:id", usersController.getUserById);
router.delete("/:id", usersController.deleteUserById);
router.put("/:id", usersController.updateUserById);
router.post("/", usersController.createUser);
module.exports = router;
