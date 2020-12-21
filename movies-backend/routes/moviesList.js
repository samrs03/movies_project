const router = require("express").Router();
const { DBConnection } = require("../db/ConnectionObject");
const { QueryTypes } = require("sequelize");
const { queries } = require("../config/dbQueries.json");

// router.get("/", async (req, res) => {
//   DBConnection.query(queries.moviesList, {
//     type: QueryTypes.SELECT,
//   })
//     .then((result) => {
//       return res.status(200).send(result);
//     })
//     .catch((error) => {
//       return res.status(500).send(error);
//     });
// });

router.get("/", async (req, res) => {
  if (req.body.query !== undefined) {
    DBConnection.query(queries.searchingQuery, {
      replacements: {
        query: req.body.query,
      },
      type: QueryTypes.SELECT,
    })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  } else {
    DBConnection.query(queries.moviesList, {
      type: QueryTypes.SELECT,
    })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  }
});
module.exports = {
  router,
};
