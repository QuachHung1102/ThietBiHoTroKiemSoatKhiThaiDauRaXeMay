const path = require("path");
const fs = require("fs");
const { rootDir1, rootDir2 } = require("../utilities/path");

const User = require("../models/user_model");

const getLoginPage = async (req, res) => {
  res.status(200).render("authen/login", { pageTitle: "Đăng nhập" });
};

const getRegisterPage = async (req, res) => {
  res.status(200).render("authen/register", { pageTitle: "Đăng ký" });
};

const postAddUser = async (req, res) => {
  const { userName, numberPhone, address, password } = req.body;
  const product = new User(null, userName, numberPhone, address, password);
  product.save();
  res.status(302).redirect("./login");
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { userName, numberPhone, password } = req.body;
  const updateUser = new User(id, userName, numberPhone, password);
  updateUser.save();
  // userList = [...userList, user]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào userList.
  res.status(302).redirect("../login");
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  postAddUser,
  updateUser,
};
