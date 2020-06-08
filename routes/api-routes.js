// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");



module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //Route to get all vehicles
  app.get("/api/allVehicles", (req, res) => {
    db.Vehicle.findAll({}).then(result => res.json(result));
  });

  // POST route for saving a new post
  app.post("/api/postVehicle", function (req, res) {
    console.log(req.body);
    db.Vehicle.create({
      type: req.body.type,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      vin: req.body.vin,
      mileage: req.body.mileage,
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/vehicles/:id", function (req, res) {
    db.Vehicle.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbVehicle) {
        res.json(dbVehicle);
      });
  });

  // Get route for returning posts of a specific type
  app.get("/api/allVehicles/type/:type", function (req, res) {
    db.Vehicle.findAll({
      where: {
        type: req.params.type
      }
    })
      .then(function (dbVehicle) {
        res.json(dbVehicle);
      });
  });

  // PUT route for updating posts
  app.put("/api/vehicles/", function (req, res) {
    db.Vehicle.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbVehicle) {
        res.json(dbVehicle);
      });
  });
};
