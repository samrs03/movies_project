const config = require("config");
const jwt = require("jsonwebtoken");
let userRol, userID;
const authorizationMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log("From middleware", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token.split(" ")[1], config.JWTSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token Expired" });
    }
    res.decoded = decoded;
    // console.log(decoded);
    userRol = decoded.rol;
    // userID = decoded.id;
    next();
  });
};
const crossPlatform = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};

module.exports = {
  crossPlatform,
  authorizationMiddleware,
};
