const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", async (req, res) => {
    const products = await Product.findAll();
    res.render("index", { products });
});

module.exports = router;