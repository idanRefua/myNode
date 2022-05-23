const express = require("express");
const router = express.Router();
const authRoute = require("./api/auth");
const productRoute = require("./api/products");
const desktopPcRoute = require("./api/desktopPc");
const authMiddleWare = require("../middleware/auth.middleware");
const smartPhonesRoute = require("./api/smartPhone.routes");
const laptopsRoute = require("./api/laptopProduct.route");
const categoryRoutes = require("./api/newProduct.routes");

router.use("/auth", authRoute);
router.use("/products", authMiddleWare, productRoute);
/* router.use("/products/desktoppc", authMiddleWare, desktopPcRoute);
router.use("/products/smartphones", authMiddleWare, smartPhonesRoute);
router.use("/products/laptops", authMiddleWare, laptopsRoute); */
router.use("/category", categoryRoutes);
router.get("/", (req, res) => {
  res.json("work");
});

module.exports = router;
