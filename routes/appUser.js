// @ts-nocheck

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
let AppUser = require("../models/appUser.model");

const AuthController = require("../controller/AuthController");

router.get("/", authenticate, function (req, res) {
  AppUser.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/delete/id", authenticate, async (req, res) => {
  try {
    const Item = await AppUser.findByIdAndRemove(id,(error, deletedHero) =>{
        if(error) console.log(error);
        if(!error) console.log(deletedHero)
    });
    if (!Item) res.status(404).send("No user found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;