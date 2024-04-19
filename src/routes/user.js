const express = require("express");
const userController = require("../controller/user");
const { authMiddleware } = require("../middlewares/middleware");
const router = express.Router();

router.post("/", authMiddleware, userController.createUser);
router.get("/", authMiddleware, userController.getUsers);
router.get("/options", authMiddleware, userController.getAllUsers);
router.get("/id/:id", authMiddleware, userController.getUsers);
router.patch("/id/:id", authMiddleware, userController.updateUser);
router.delete("/id/:id", authMiddleware, userController.deleteUser);

exports.router = router;
