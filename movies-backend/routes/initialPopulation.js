const router = require("express").Router();
const { DBConnection } = require("../db/ConnectionObject");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes } = require("sequelize");
router.get("/", async (req, res) => {
  DBConnection.query(queries.populatingListView, {
    type: QueryTypes.SELECT,
  })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      return res.status(200).send(error);
    });
});

module.exports = {
  router,
};
