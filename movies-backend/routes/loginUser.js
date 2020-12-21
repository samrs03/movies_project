const router = require("express").Router();
const config = require("config");
const { DBConnection } = require("../db/ConnectionObject");
const { queries } = require("../config/dbQueries.json");
const JSONWebToken = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

router.post("/", async (req, res) => {
  if (!Object.keys(req.body).length > 0) {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: "There are missing values in the request",
    });
  }
  DBConnection.query(queries.login, {
    replacements: {
      user_IDCC: req.body.user_IDCC,
    },
    types: QueryTypes.SELECT,
  })
    .then((result) => {
      if (
        req.body.user_IDCC == result[0][0].user_IDCC &&
        req.body.user_password == result[0][0].user_password
      ) {
        const userID = result[0][0].user_id;
        const IDCC = req.body.user_IDCC;
        const password = req.body.user_password;
        const userRol = result[0][0].user_rol;
        const payload = { userID, IDCC, password, userRol };
        const token = JSONWebToken.sign(payload, config.JWTSecret);
        return res.status(200).json({ token: token, user_email: result[0][0].user_email,user_IDCC: req.body.user_IDCC});
      } else {
        return res.status(400).json({
          errorCode: 400,
          errorMessage: "There is no match between user or password",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        errorCode: 500,
        errorMessage: "Error while trying to get information from DB",
        errorDescription: error,
      });
    });
});

module.exports = {
  router,
};
