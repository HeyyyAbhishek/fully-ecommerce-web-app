const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const config = process.env;
console.log("Config: ", config.TOKEN_KEY);

const tokenVerification = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req?.signedCookies?.user?.token;
  // console.log("Token Body: ", tokeonBody);
  // console.log("Token Query: ", tokenQuery);
  // console.log("Token Headers: ", tokenHeaders);
  // console.log("Token Cookies: ", tokenCookies);
  
  console.log("Token: ", token);
  if (!token) {
    return res.status(403).send({
      auth: true,
      message: "Token is not provided.",
      status: 403
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log("Decoded: ", decoded);
    
    req.user = decoded;
  } catch (err) {
    console.log("Failed to authenticate token.");
    console.log( err);
    return res.status(401).send({
      auth: false,
      message: "Failed to authenticate token.",
      status: 401
    });
  }
  return next();
};

module.exports = tokenVerification;