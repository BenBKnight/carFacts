const app = require("express");
const router = app.Router();

router.get("/carmd", (req, res) => {
  res.json("../db/testData.js");
});

module.exports = router;
