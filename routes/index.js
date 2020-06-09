const app = require("express");
const router = app.Router();

const login = require("./login");
const signUp = require("./signup");
const member = require("./member");

router.use(login);
router.use(signUp);
router.use(member);

module.exports = router;
