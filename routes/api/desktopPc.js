const express = require("express");
const router = express.Router();
const desktopPcMoudle = require("../../models/desktoppc.model");
const desktopPcValidation = require("../../validation/desktopPc.validation");

router.get("/", async (req, res) => {
  try {
    const allDesktopPc = await desktopPcMoudle.allDesktoppcProduct();
    res.status(200).json({ allDesktopPc });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/mydesktop", async (req, res) => {
  try {
    const myDesktopPcProducts = await desktopPcMoudle.myDesktoppcProducts();
    res.status(200).json({ myDesktopPcProducts });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.post("/adddesktoppcproduct", async (req, res) => {
  try {
    if (req.userData.isAdmin) {
      const validateDesktopPc =
        await desktopPcValidation.desktopPcProductSchema.validateAsync(
          {
            ...req.body,
            createdBy: req.userData._id,
          },
          {
            abortEarly: true,
          }
        );

      const newDesktopPcProduct = await desktopPcMoudle.addDesktopPcProduct(
        validateDesktopPc.title,
        validateDesktopPc.image,
        validateDesktopPc.shortinfo,
        validateDesktopPc.cpu,
        validateDesktopPc.gpu,
        validateDesktopPc.ram,
        validateDesktopPc.harddrive,
        validateDesktopPc.description,
        validateDesktopPc.price,
        req.userData._id
      );

      res.status(200).json({ msg: " You created new Desktop Pc  product" });
    } else
      (err) => {
        console.log("You are not admin user !", err);
      };
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.delete("/deletdesktoppcproduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDesktopPcProduct =
      await desktopPcMoudle.deleteDesktopPcProduct(id);
    res.status(200).json({ deletedDesktopPcProduct });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.put("/updatedesktoppc/:id", async (req, res) => {
  try {
    const userId = req.userData._id;
    const id = req.params.id;
    const productDesktopPcBody = req.body;

    const updateProductDesktopPc = await desktopPcMoudle.updateDesktopPcProduct(
      id,
      userId,
      productDesktopPcBody
    );
    res.status(200).json(updateProductDesktopPc);
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/moreinfo/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await desktopPcMoudle.productById(productId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

module.exports = router;
