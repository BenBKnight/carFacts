// Requiring our models and passport as we've configured it
const db = require("../models");
// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const app = require("express");
const router = app.Router();
// const passport = require("../config/passport");

// View members vehicles
router.get("/vehicles", (req, res) => {
  res.render("vehicles");
});

//Route to get all vehicles
router.get("/api/allVehicles", (req, res) => {
  db.Vehicle.findAll({}).then(result => res.json(result));
});

router.get("/vehiclefind/:userid", (req, res) => {
  const userId = req.params.userid;
  db.Vehicle.findAll({
    where: {
      UserId: userId
    }
  }).then(result => {
    console.log(result);
    res.send(result);
  });
});

router.get("/vehicles/:id", (req, res) => {
  const vehicleId = req.params.id;
  db.Vehicle.findAll({
    where: {
      id: vehicleId
    }
  }).then(() => res.render("vehicleDisplay"));
});

// POST route for saving a new post
router.post("/api/postVehicle", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  db.Vehicle.create({
    type: req.body.type,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    vin: req.body.vin,
    mileage: req.body.mileage,
    UserId: req.user.id
  }).then(dbPost => {
    res.json(dbPost);
  });
});

// DELETE route for deleting posts
router.delete("/api/vehicles/:id", (req, res) => {
  db.Vehicle.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbVehicle => {
    res.json(dbVehicle);
  });
});

// Get route for returning posts of a specific type
router.get("/api/allVehicles/type/:type", (req, res) => {
  db.Vehicle.findAll({
    where: {
      type: req.params.type
    }
  }).then(dbVehicle => {
    res.json(dbVehicle);
  });
});

// // PUT route for updating posts
// router.put("/api/vehicles/", function (req, res) {
//     db.Vehicle.update(req.body,
//         {
//             where: {
//                 id: req.body.id
//             }
//         })
//         .then(function (dbVehicle) {
//             res.json(dbVehicle);
//         });
// });

module.exports = router;
