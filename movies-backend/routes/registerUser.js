const router = require("express").Router();
const { DBConnection } = require("../db/ConnectionObject");
const { QueryTypes } = require("sequelize");
const queries = require("../config/dbQueries.json").queries;
router.post("/", async (req, res) => {
  DBConnection.query(queries.registerNewUser, {
    replacements: {
      user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_IDCC: req.body.user_IDCC,
      user_phone: req.body.user_phone,
    },
    type: QueryTypes.INSERT,
  })
    .then(() => {
      return res.status(200).json({
        status: 200,
        Message: "Succesfully Registered",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        errorStatus: 500,
        errorMessage: "Problems when inserting to users table",
        messageDescription: error,
      });
    });
});

module.exports = {
  router,
};
