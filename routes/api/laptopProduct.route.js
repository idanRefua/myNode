const express = require("express");
const router = express.Router();
const laptopModel = require("../../models/laptop.model");
const laptopSchema = require("../../validation/laptop.validation");

router.get("/", async (req, res) => {
  try {
    const allLaptops = await laptopModel.allLaptopsProducts();

    res.status(200).json({ allLaptops });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/mylaptops", async (req, res) => {
  try {
    const userId = req.userData._id;
    const myLaptops = await laptopModel.myLaptopsProducts(userId);
    res.status(200).json({ myLaptops });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.delete("/deletelaptop/:id", async (req, res) => {
  try {
    const laptopId = req.params.id;
    const deleteLaptop = await laptopModel.deleteLaptopById(laptopId);
    res.status(200).json({ deleteLaptop });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.post("/addlaptop", async (req, res) => {
  try {
    const validateLaptopProduct =
      await laptopSchema.latptopProductSchema.validateAsync(
        {
          ...req.body,
          creatdBy: req.userData._id,
        },
        {
          abortEarly: true,
        }
      );
    const newLaptop = await laptopModel.addLaptopProduct(
      validateLaptopProduct.title,
      validateLaptopProduct.image,
      validateLaptopProduct.shortinfo,
      validateLaptopProduct.cpu,
      validateLaptopProduct.gpu,
      validateLaptopProduct.ram,
      validateLaptopProduct.battery,
      validateLaptopProduct.harddrive,
      validateLaptopProduct.description,
      validateLaptopProduct.price,
      req.userData._id
    );

    res.status(200).json("You created a new Laptop products");
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

module.exports = router;
