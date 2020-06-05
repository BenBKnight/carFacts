const express = require("express");
const router = express.Router();
const index = require("../models/index.js");

router.get("/login", function (req, res){
    res.render("login");
});
router.get("/signup", function (req, res){
    res.render("signup");
});
router.get("/members", function (req, res){
    res.render("members");
} )
module.exports = router