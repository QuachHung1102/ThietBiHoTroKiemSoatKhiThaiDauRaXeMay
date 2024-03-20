const path = require("path");
const fs = require("fs");
const { rootDir1, rootDir2 } = require("../utilities/path");

const pathP = path.join(rootDir1, "data", "emissionsData.json");
const pathP1 = path.join(rootDir1, "data", "emissonsLogSave.json");

const Emission = require("../models/emission_model");

const getControlPage = async (req, res) => {
  const data = req.body;
  try {
    Emission.findById(data.id, (emission) => {
      if (data.deviceType === "mobile") {
        res.status(200).json(emission);
      } else if (data.deviceType === "web") {
        console.log(`Render trang controll khi đăng nhập`);
        res.status(200).render("controll/controll", {
          pageTitle: "Quản lý",
          emission,
          userId: data.id,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// UpdateEmission này mới là updateEmission đúng
const updateEmission = async (req, res) => {
  const id = req.params.id;
  const { locat, timeLabel, emissiondt, dateLabel, alert } = req.body;

  try {
    let updateEmis;
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
      updateEmis = new Emission(
        emission.id,
        updateEmission.location,
        updateEmission.labels,
        updateEmission.emissions,
        updateEmission.alert
      );
      // Không được xóa
      // const updateEmis = new Emission(
      //   id,
      //   updateEmission.location,
      //   updateEmission.labels,
      //   updateEmission.emissions,
      //   updateEmission.alert
      // );

      // updateEmis.save();
      // Emission.saveLog(id, timeLabel, emissiondt, dateLabel);

      console.log(updateEmis);
      Emission.findAll((emissionList) => {
        emissionList.map((emissionEle) => {
          emissionEle.location = updateEmis.location;
          emissionEle.labels = updateEmis.labels;
          emissionEle.emissions = updateEmis.emissions;
          emissionEle.alert = updateEmis.alert;
          // updateEmis.save();
          // Emission.saveLog(emissionEle.id, timeLabel, emissiondt, dateLabel);
        });
        fs.writeFile(pathP, JSON.stringify(emissionList), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Update success emission`);
          }
        });
      });
      Emission.findAllLog((listLog) => {
        const newObj = {
          [`${timeLabel} - ${dateLabel}`]: emissiondt,
        };
        listLog.map((logItem) => {
          logItem.emissionsData = { ...logItem.emissionsData, ...newObj };
        });
        fs.writeFile(pathP1, JSON.stringify(listLog), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Update success emission log`);
          }
        });
      });
      res.status(200).send(`Updated`);
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
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

const getAllLogEmission = async (req, res) => {
  try {
    Emission.findAllLog((listLog) => {
      res.status(200).send(listLog);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLogEmissionById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    Emission.findLogById(id, (log) => {
      if (data.deviceType === "mobile") {
        res.status(200).json(log);
      } else if (data.deviceType === "web") {
        res.status(200).render("controll/controll", {
          log,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getControlPage,
  updateEmission,
  getEmissionToRender,
  getAllLogEmission,
  getLogEmissionById,
};
