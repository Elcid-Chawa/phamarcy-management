const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts"); // Require the layout package
const bodyParser = require("body-parser");

const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./helpers/db"); // Sequelize models

const app = express();

// EJS setup
app.use(expressLayouts); // Use express-ejs-layouts
app.set("view engine", "ejs");
app.set("layout", "layout"); // This refers to layout.ejs by default

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mySecretKey",
    store: new SequelizeStore({ db: db }),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  res.locals.session = req.session;
  next();
});

// Routes
app.use("/", require("./routes/index"));

// Database sync
db.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
