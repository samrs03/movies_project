const { Sequelize } = require("sequelize");
const config = require("config");
const DBConnection = new Sequelize(
  config.DBConfiguration.db,
  config.DBConfiguration.User,
  config.DBConfiguration.Password,
  {
    host: config.DBConfiguration.Host,
    dialect: config.DBConfiguration.Dialect,
  }
);

DBConnection.sync({ force: false })
  .then(() => {
    console.log("DB and tables syncronized");
  })
  .catch((error) => {
    console.log(
      `There was an error while syncronizing the DB and tables ${error}`
    );
  });

module.exports = {
  DBConnection,
};
