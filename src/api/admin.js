const express = require("express");
const controller = require("../controllers/admin");
const middlewares = require("../middlewares");

const router = express.Router();

router.get(
  "/students",
  [middlewares.verifyToken, middlewares.isAdmin],
  controller.getAllStudents
);

router.get(
  "/student/:id",
  [middlewares.verifyToken, middlewares.isAdmin],
  controller.getStudent
);

router.post("/student", [middlewares.verifyToken ,middlewares.isAdmin], controller.addStudent);

router.put(
  "/student/:id",
  [middlewares.verifyToken, middlewares.isAdmin],
  controller.updateStudent
);

router.delete(
  "/student/:id",
  [middlewares.verifyToken, middlewares.isAdmin],
  controller.deleteStudent
);

module.exports = router;
