const model = require("../../models/adminUser");
const AdminUser = model.AdminUser;
const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser')
const fs = require("fs");
const path = require("path");
// const p = require('../../../')
const privateKey = fs.readFileSync(
  path.join(__dirname, "../../../private.key"),
  "utf-8"
);
const bcrypt = require("bcrypt");

const registerAdminUser = async (req, res) => {
  const adminUser = new AdminUser(req.body);
  //jwt token simple
  //   var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);

  // private-public key
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password.toString(), 10);
  adminUser.password = hash;
  adminUser.token = token;
  adminUser
    .save()
    .then((result) => {
      res.status(200).send({ message: "data saved successfully" });
    })
    .catch((error) => {
      res
        .status(410)
        .send({ data: error, message: "data not saved successfully" });
    });
};

const loginAdminUser = async (req, res) => {
  try {
    const doc = await AdminUser.findOne({
      $or: [{ email: req.body.email }, { username: req.body.email }],
    });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      const token = jwt.sign(
        { email: req.body.email, userLevel: doc.role, userId: doc._id },
        privateKey,
        {
          algorithm: "RS256",
        }
      );

      // Assign refresh token in http-only cookie

      doc.token = token;
      doc
        .save()
        .then(() => {
          // set cookies   //===============================================================================
          // let options = {
          //   expires: new Date(Date.now() + 100000000),
          //   httpOnly: true,
          // };
          // res.cookie("formsaver21jwttoken", "hellomans", options);

          // set cookies   //===============================================================================
          res.status(200).json({
            accessToken: { jwt: token },
            message: "Login successful.",
          });
        })
        .catch((error) => {
          res
            .status(410)
            .send({ data: error, message: "Invalid login attempt" });
        });
    } else {
      res.status(401).send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};
module.exports = { registerAdminUser, loginAdminUser };
