const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const http = require("http");
const server = express();
const cors = require("cors");
const middlewares = require("./middlewares/middlewares");

server.use(bodyParser.json());

// server.use(middlewares.crossPlatform);
server.use(cors());

const populatingInitialRouter = require("./routes/initialPopulation").router;
server.use(
  "/api/v1/movies_project/movies/initialPopulation",
  populatingInitialRouter
);

const registerUserRouter = require("./routes/registerUser").router;
server.use("/api/v1/movies_project/users/register", registerUserRouter);

const loginUserRouter = require("./routes/loginUser").router;
server.use("/api/v1/movies_project/users/login", loginUserRouter);

const moviesListRouter = require("./routes/moviesList").router;
server.use("/api/v1/movies_project/movies/list", moviesListRouter);

const reservationsRouter = require("./routes/reservations").router;
server.use("/api/v1/movies_project/reservations", reservationsRouter);

http.createServer(server).listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
