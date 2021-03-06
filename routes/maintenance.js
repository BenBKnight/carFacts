const app = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = app.Router();
// const passport = require("../config/passport");
const db = require("../models");

router.get("/maintenance", isAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, "../public/maintenance.html"));
  res.render("maintenance");
});

router.get("/newMaintenance", isAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, "../public/newMaintenance.html"));
  res.render("newMaintenance");
});

router.post("/api/maintenance", (req, res) => {
  db.Maintenance.create({
    name: req.body.name,
    description: req.body.description,
    milage: req.body.milage,
    parts: req.body.parts,
    jobDate: req.body.jobDate,
    VehicleId: req.body.VehicleId
  })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/api/maintenance", (req, res) => {
  db.Maintenance.findAll()
    .then(result => {
      res.send(result);
    })
    .catch(() => res.status(401).json(err));
});

router.get("/maintenancefind/:jobid", (req, res) => {
  const jobId = req.params.jobid;
  db.Maintenance.findAll({
    where: {
      id: jobId
    }
  }).then(result => res.send(result))
  .catch(() => res.status(401).json(err));
});

router.get("/maintenance/:jobid", isAuthenticated, (req, res) => {
  res.render("maintRecord");
});

router.get("/maintenancefindvehicle/:vehicleid", (req, res) => {
  const vehicleId = req.params.vehicleid;
  db.Maintenance.findAll({
    where: {
      VehicleId: vehicleId
    }
  }).then(result => {
    res.send(result);
  })
  .catch(() => res.status(401).json(err));
});

module.exports = router;
