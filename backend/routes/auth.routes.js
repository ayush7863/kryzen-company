const express=require("express");
const { UserModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter=express.Router();


authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the collection
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // If the email already exists, return a response to the client
      return res.status(400).send({ msg: "Email already exists. Please use another email." });
    }

    // If the email does not exist, hash the password and save the new user
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).send({ msg: "Error hashing password." });
      }

      const user = new UserModel({ username, email, password: hash });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!" });
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});


authRouter.post("/login", async (req, res) => {
  const { email,password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
    //   console.log(user)
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successful!",
            token: jwt.sign({ userID: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports={
    authRouter,
}
