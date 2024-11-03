const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const router = express.Router();

// Registration
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashedPassword, isAdmin });
  res.redirect("/auth/login");
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/auth/login");
  }

  req.session.userId = user.id;
  req.session.isAdmin = user.isAdmin;
  req.flash("success", "Successful login!");
  res.redirect("/products");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
