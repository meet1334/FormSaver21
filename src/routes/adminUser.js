const express = require("express");
const adminUserController = require("../controller/adminUser");
const { authMiddleware } = require("../middlewares/middleware");
const router = express.Router();

router.get("/", authMiddleware, adminUserController.getAdminUsers);
router.get("/options", authMiddleware, adminUserController.getAllAdminUsers);
router.get("/id/:id", authMiddleware, adminUserController.getAdminUser);
router.patch("/id/:id", authMiddleware, adminUserController.updateAdminUser);
router.delete("/id/:id", authMiddleware, adminUserController.deleteAdminUser);
router.get("/exportexcel", adminUserController.exportAdminUsers);

exports.router = router;
