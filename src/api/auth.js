const express = require("express");
const controller = require("../controllers/auth");
const middlewares = require("../middlewares");

const router = express.Router();

router.post("/register", [middlewares.checkRolesExisted], controller.register);
router.post("/login", controller.login);

module.exports = router;
