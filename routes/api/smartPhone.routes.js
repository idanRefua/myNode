const express = require("express");
const router = express.Router();
const smartPhoneModel = require("../../models/smartphone.model");
const smartPhoneSchema = require("../../validation/smartPhone.validtion");

router.get("/", async (req, res) => {
  try {
    const allSmartphones = await smartPhoneModel.allSmartphoneProducts();
    res.status(200).json({ allSmartphones });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/mysmartphones", async (req, res) => {
  try {
    const userId = req.userData._id;
    const mySmartphones = await smartPhoneModel.mySmartphones(userId);
    res.status(200).json({ mySmartphones });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.post("/addsmartphone", async (req, res) => {
  try {
    if (req.userData.isAdmin) {
      const validateSmartphone =
        await smartPhoneSchema.smartPhoneProductSchema.validateAsync(
          {
            ...req.body,
            createdBy: req.userData._id,
          },
          { abortEarly: true }
        );

      const newSmartphoneProduct = await smartPhoneModel.addSmartPhoneProduct(
        validateSmartphone.title,
        validateSmartphone.image,
        validateSmartphone.shortinfo,
        validateSmartphone.cpu,
        validateSmartphone.ram,
        validateSmartphone.battery,
        validateSmartphone.camera,
        validateSmartphone.screen,
        validateSmartphone.description,
        validateSmartphone.price,
        req.userData._id
      );

      res.status(200).json({ msg: "You created new SmartPhone Product" });
    } else {
      console.log("You are not admin user !");
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

module.exports = router;
