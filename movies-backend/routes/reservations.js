const router = require("express").Router();
const { DBConnection } = require("../db/ConnectionObject");
const { queries } = require("../config/dbQueries.json");
const middlewares = require("../middlewares/middlewares");
const { QueryTypes } = require("sequelize");
// router.use(middlewares.authorizationMiddleware);
router.post("/", async (req, res) => {
  DBConnection.query(queries.makingReservation, {
    replacements: {
      user_IDCC: req.body.user_IDCC,
      movie_name: req.body.movie_name,
      movie_time: req.body.movie_time,
      room_id: req.body.room_id,
    },
    type: QueryTypes.INSERT,
  })
    .then(() => {
      return res.status(200).send("information sent to DB");
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});
module.exports = { router };
