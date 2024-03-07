const User = require("../../models/user_model");

const authenticate = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    User.findByUserNam(data.tenDangNhap, (user) => {
      console.log(user);
      if (data.matKhau == user.password) {
        return next();
      } else {
        // res.status(404).json({ error: "Sai thông tin đăng nhập!" });
        res.status(404).render("404", {
          pageTitle: "Sai thông tin đăng nhập",
          activeClass: "",
        });
      }
    });
  } catch (error) {
    res.status(500).alert(error);
  }
};

module.exports = {
  authenticate,
};
