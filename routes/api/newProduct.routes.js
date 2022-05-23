const express = require("express");
const router = express.Router();
const categoryModel = require("../../models/category.model");

router.post("/", async (req, res) => {
  try {
    const name = req.body;
    const newCategory = await categoryModel.addCategory(name);

    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
