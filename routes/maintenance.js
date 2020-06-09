const app = require("express");
const router = app.Router();
const passport = require("../config/passport");

router.get("/maintenance", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/maintenance.html"));
  res.render("maintenance");
});

router.get("/newMaintenance", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/newMaintenance.html"));
  res.render("newMaintenance");
});

router.get("/maintenance/maintRecord", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/maintRecord.html"));
  res.render("maintRecord");
});

module.exports = router;