import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import User from "../models/user.model.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in the form" });
  }
  //Check user does not exist
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "email already exists" });
  });
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        });
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Cannot register user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill in the form" });
  }

  //Check user does not exist
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "email does not  exists" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.status(400).json({ msg: "Incorrect password" });
      jwt.sign(
        { id: user.id },
        config.JwtSercret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

const getUser = async (req, res) => {
  try {
    User.findById(req.user.id)
      .select("-password")
      .then((user) => {
        res.send(user);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default { register, login, getUser };
