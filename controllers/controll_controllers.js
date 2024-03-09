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
      userId: id,
    });
  });
};

const updateEmission = async (req, res) => {
  const id = req.params.id;
  const { locat, timeLabel, emissiondt, dateLabel, alert } = req.body;

  Emission.findById(id, (emission) => {
    let updateEmission = emission;
    updateEmission.location = locat;
    updateEmission.alert = alert;
    if (updateEmission.labels.at(-1) !== timeLabel) {
      updateEmission.labels.splice(0, 1);
      updateEmission.labels.push(timeLabel);
    }
    for (const key in updateEmission.emissions) {
      updateEmission.emissions[key].data.splice(0, 1);
      updateEmission.emissions[key].data.push(emissiondt[key]);
    }
    const updateEmis = new Emission(
      id,
      updateEmission.location,
      updateEmission.labels,
      updateEmission.emissions,
      updateEmission.alert
    );

    updateEmis.save();
    Emission.saveLog(id, timeLabel, emissiondt, dateLabel);
    // res.status(200).render("controll/controll", {
    //   pageTitle: "Quản lý",
    //   emissions: updateEmission,
    // });
    res.status(200).send(`Updated`);
  });
};

const getEmissionToRender = async (req, res) => {
  const id = req.params.id;
  try {
    Emission.findById(id, (emission) => {
      const location = emission.location;
      const label = emission.labels.at(-1);
      const alert = emission.alert;
      const emissions = emission.emissions.map((e) => {
        return e.data.at(-1);
      });
      const renderData = { label, emissions, alert, location };
      res.status(200).json(renderData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = {
  getControlPage,
  updateEmission,
  getEmissionToRender,
};
