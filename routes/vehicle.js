// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");

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