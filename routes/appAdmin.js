const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const AdminController = require("../controller/AdminController");

let AppAdmin = require("../models/appAdmin.model");

router.get("/", authenticate, function (req, res) {
  AppAdmin.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);
module.exports = router;