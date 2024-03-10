const User = require("../../models/user_model");

const authenticate = async (req, res, next) => {
  const data = req.body;
  try {
    User.findByUserNam(data.tenDangNhap, (user) => {
      if (user && data.matKhau == user.password) {
        req.body.id = user.id;
        return next();
      } else {
        // res.status(404).json({ error: "Sai thông tin đăng nhập!" });
        if (data.deviceType === "mobile") {
          res.status(404).json({ error: "Sai thông tin đăng nhập!" });
        } else if (data.deviceType === "web") {
          res.status(404).render("404", {
            pageTitle: "Sai thông tin đăng nhập",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).alert(error);
  }
};

module.exports = {
  authenticate,
};
