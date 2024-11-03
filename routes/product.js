const express = require("express");

const router = express.Router();

const Product = require("../models/product");
const session = require("express-session");

// List all products
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.render("products/index", { products });
});

// Create product
router.get("/create", (req, res) => {
  if (!req.session.isAdmin) {
    req.flash("error", "Only admin can add products");
    return res.redirect("/products");
  }
  res.render("products/create");
});

router.post("/create", async (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/products");

  const { name, price, quantity, description } = req.body;
  await Product.create({ name, price, quantity, description });
  res.redirect("/products");
});

// Edit product
router.get("/edit/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    req.flash("error", "Only admin can edit products");
    return res.redirect("/products");
  }
  const product = await Product.findByPk(req.params.id);
  res.render("products/edit", { product });
});

router.post("/edit/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    req.flash("error", "Only admin can edit products");
    return res.redirect("/products");
  }

  const { name, price, quantity, description } = req.body;
  try {
    await Product.update(
      { name, price, quantity, description },
      { where: { id: req.params.id } },
    );
    req.flash("success", "Successfully added product! " + name);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add product! " + error);
  }

  res.redirect("/products");
});

// Delete product
router.post("/delete/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    req.flash("error", "Only admin can delete products");
    return res.redirect("/products");
  }
  await Product.destroy({ where: { id: req.params.id } });
  res.redirect("/products");
});

module.exports = router;
