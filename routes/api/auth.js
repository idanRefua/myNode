const express = require("express");
const router = express.Router();
const jwt = require("../../config/jwt");
const bcrypt = require("../../config/bcrypt");
const usersMoudle = require("../../models/users.model");
const usersValidation = require("../../validation/user.validation");

router.post("/register", async (req, res) => {
  try {
    const validateUser = await usersValidation.registerSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    const users = await usersMoudle.selectUserByEmail(validateUser.email);

    if (users.length === 0) {
      const hashPassword = await bcrypt.createPassword(validateUser.password);
      const newUser = await usersMoudle.addUser(
        validateUser.email,
        hashPassword,
        validateUser.firstname,
        validateUser.lastname,
        validateUser.isAdmin,
        validateUser.phone
      );

      res.json({ msg: "User created !" });
    } else {
      throw "that email  already exist ";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validateUser = await usersValidation.loginSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const users = await usersMoudle.selectUserByEmail(validateUser.email);

    if (users.length > 0) {
      const hashUser = await bcrypt.comparePassword(
        validateUser.password,
        users[0].password
      );

      if (hashUser) {
        const token = await jwt.generateToken({
          _id: users[0]._id,
          email: users[0].email,
          name: users[0].firstname,
          lastname: users[0].lastname,
          isAdmin: users[0].isAdmin,
        });

        res.json({ token });
      } else {
        throw "email or password incorrect !";
      }
    } else {
      throw "email or password incorrect !";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
