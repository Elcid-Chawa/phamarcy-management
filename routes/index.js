const express = require("express");
const router = express.Router();
const mainRoutes = require("./main");
const authRoutes = require("./auth");
const productRoutes = require("./product");


// use the imported routes
router.use("/", mainRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);

module.exports = router;