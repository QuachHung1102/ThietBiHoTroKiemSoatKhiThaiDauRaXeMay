const path = require("path");

const express = require("express");

const {
  getControlPage,
  updateEmission,
} = require("../controllers/controll_controllers");

const homeRouter = express.Router();
//TODO: add a redirect from "/" to "/controll"
homeRouter.get("/controll", getControlPage);
homeRouter.post("/controll/:id", getControlPage);
homeRouter.post("/update-emission/:id", updateEmission);

module.exports = {
  homeRouter,
};
