const express = require("express");
const authController = require("../controller/auth/auth");
const { authMiddleware } = require("../middlewares/middleware");
const router = express.Router();

router.post("/auth/signup", authMiddleware, authController.registerAdminUser);
router.post("/auth/login", authController.loginAdminUser);

exports.router = router;
