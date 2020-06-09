// Npm packages
const express = require("express");
const session = require("express-session");

// // Requiring passport as we've configured it
const passport = require("./config/passport");
const app = express();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Setting up Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Establishing routes
const routes = require("./routes/index");
app.use(routes);

// Sever Listener
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
