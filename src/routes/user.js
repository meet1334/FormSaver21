const express = require("express");
const userController = require("../controller/user");
const { authMiddleware } = require("../middlewares/middleware");
const router = express.Router();

// router.post("/auth/signup", authMiddleware, userController.registerAdminUser);
// router.post("/auth/login", authController.loginAdminUser);

exports.router = router;
