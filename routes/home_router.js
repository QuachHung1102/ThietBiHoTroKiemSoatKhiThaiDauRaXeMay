const path = require("path");

const express = require("express");

const {
  getControlPage,
  updateEmission,
  getEmissionToRender,
  getAllLogEmission,
  getLogEmissionById,
} = require("../controllers/controll_controllers");

const { authenticate } = require("../middlewares/auth/authenticate");

const homeRouter = express.Router();
//TODO: add a redirect from "/" to "/controll"
// homeRouter.get("/controll", getControlPage);
homeRouter.post("/controll", authenticate, getControlPage);
homeRouter.post("/update-emission/:id", updateEmission);
homeRouter.get("/get-data-to-render/:id", getEmissionToRender);
homeRouter.get("/get-log-data", getAllLogEmission);
homeRouter.get("/get-log-data/:id", getLogEmissionById);

module.exports = {
  homeRouter,
};
