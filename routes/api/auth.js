const express = require("express");
const router = express.Router();
const jwt = require("../../config/jwt");
const bcrypt = require("../../config/bcrypt");
const usersMoudle = require("../../models/users.model");
const usersValidation = require("../../validation/user.validation");
const authMiddleWare = require("../../middleware/auth.middleware");

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
          firstname: users[0].firstname,
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

router.patch("/edituserdetails/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const validateEdit = await usersValidation.editDetailsSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const updateUser = await usersMoudle.editUserDetail(
      userId,
      validateEdit.email,
      validateEdit.firstname,
      validateEdit.lastname
    );
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/mydetails", authMiddleWare, async (req, res) => {
  try {
    const id = req.userData._id;

    const userInfo = await usersMoudle.myDetails(id);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.patch("/changepass/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const validateEditPassword =
      await usersValidation.changePasswordSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    const user = await usersMoudle.myDetails(userId);

    const userPassword = await bcrypt.comparePassword(
      validateEditPassword.currentPassword,
      user.password
    );
    if (userPassword) {
      if (
        validateEditPassword.newPassword === validateEditPassword.newPassword2
      ) {
        const hashPassword = await bcrypt.createPassword(
          validateEditPassword.newPassword2
        );
        const updatePassword = await usersMoudle.editPassword(
          userId,
          hashPassword
        );
        res.status(200).send("Your Password Change !");
      } else {
        throw "The two password don't Match !";
      }
    } else {
      throw "The password is inccorect !";
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
