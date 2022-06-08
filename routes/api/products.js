const express = require("express");
const router = express.Router();
const productsMoudle = require("../../models/product.model");
const productValidation = require("../../validation/product.validation");

router.get("/", async (req, res) => {
  try {
    const allProducts = await productsMoudle.allProducts();
    res.status(200).json({ allProducts });
  } catch (err) {
    res.status(400).json({ err });
    console.log(err);
  }
});

router.get("/desktoppc", async (req, res) => {
  try {
    const allDesktopPc = await productsMoudle.allDesktopPcProducts({});
    res.status(200).json({ allDesktopPc });
  } catch (error) {
    res.status(400).json({ error });
    console.log(err);
  }
});

router.get("/smartphones", async (req, res) => {
  try {
    const allSmartphones = await productsMoudle.allSmartphoneProducts({});

    res.status(200).json({ allSmartphones });
  } catch (error) {
    res.status(400).json({ error });
    console.log(err);
  }
});

router.get("/laptops", async (req, res) => {
  try {
    const allLaptops = await productsMoudle.allLaptopProducts({});

    res.status(200).json({ allLaptops });
  } catch (error) {
    res.status(400).json({ error });
    console.log(err);
  }
});

router.get("/moreinfo/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsMoudle.productById(productId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/myproducts", async (req, res) => {
  try {
    const idUser = req.userData._id;
    const myProducts = await productsMoudle.productsByUserId(idUser);
    res.status(200).json({ myProducts });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/createproduct", async (req, res) => {
  try {
    if (req.userData.isAdmin) {
      const validateProduct =
        await productValidation.productSchema.validateAsync(
          {
            ...req.body,
            createdBy: req.userData._id,
          },
          {
            abortEarly: true,
          }
        );
      const newProduct = await productsMoudle.addProduct(
        validateProduct.category,
        validateProduct.title,
        validateProduct.image,
        validateProduct.shortinfo,
        validateProduct.description,
        validateProduct.price,
        validateProduct.likes,
        req.userData._id
      );

      res.status(201).json({ msg: "You created new Product !" });
    } else
      (err) => {
        console.log("You are not admin user ", err);
      };
  } catch (err) {
    res.status(400).json({ err }, console.log(err));
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productsMoudle.deleteProduct(id);
    res.status(200).json(`This Product Deleted ! ${deleteProduct}`);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put("/updateproducts/:id", async (req, res) => {
  try {
    const userId = req.userData._id;
    const id = req.params.id;
    const productBody = req.body;

    const updatedProduct = await productsMoudle.updateProduct(
      id,
      userId,
      productBody
    );

    res.status(200).json(updatedProduct);
  } catch (eror) {
    res.status(400).send({ error });
  }
});

router.get("/myfavourites", async (req, res) => {
  try {
    const userId = req.userData._id;
    const myFavourites = await productsMoudle.myFavourites(userId);
    res.json({ myFavourites });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/addlike/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userData._id;
    const like = await productsMoudle.addLikeToProduct(productId, userId);

    res.status(200).json({ like });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/removelikeproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userData._id;
    const removeLike = await productsMoudle.removeLikeFromProduct(
      productId,
      userId
    );
    res.status(200).json({ removeLike });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
