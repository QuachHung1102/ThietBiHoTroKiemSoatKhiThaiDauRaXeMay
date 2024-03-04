const path = require("path");
const fs = require("fs");
const { rootDir1, rootDir2 } = require("../utilities/path");

const Emission = require("../models/emission_model");

const getControlPage = async (req, res) => {
  //TODO: add auth check here
  //rederect to login if not login
  const id = req.params.id;
  Emission.findById(id, (emission) => {
    res.status(200).render("controll/controll", {
      pageTitle: "Quản lý",
      emission,
    });
  });
};

const updateEmission = async (req, res) => {
  const id = req.params.id;
  const { locat, timeLabel, emissiondt } = req.body;
  Emission.findById(id, (emission) => {
    let updateEmission = emission;
    updateEmission.location = locat;
    updateEmission.labels.splice(0, 1);
    updateEmission.labels.push(timeLabel);
    for (const key in updateEmission.emissions) {
      updateEmission.emissions[key].data.splice(0, 1);
      updateEmission.emissions[key].data.push(emissiondt[key]);
    }
    const updateEmis = new Emission(
      id,
      updateEmission.location,
      updateEmission.labels,
      updateEmission.emissions
    );

    console.log(updateEmission);
    updateEmis.save();
    res.status(200).render("controll/controll", {
      pageTitle: "Quản lý",
      emissions: updateEmission,
    });
  });
};

module.exports = {
  getControlPage,
  updateEmission,
};
