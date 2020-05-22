const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/filedatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
