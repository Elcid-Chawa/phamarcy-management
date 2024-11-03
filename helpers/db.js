const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize("pharmacy", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
