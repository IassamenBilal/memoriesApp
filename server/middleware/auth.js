import jwt from "jsonwebtoken";
import config from "../config/config.js";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token authorisation denied" });
  }
  try {
    //Verify token
    const decoded = jwt.decode(token, config.JwtSercret);

    //Add user from payload
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}

export default auth;
