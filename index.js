const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const controller = require("./controllers/uploadfile");

app.use(express.urlencoded());
//make the uploads part available to the browser
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", controller.index);
app.get("/file/upload", controller.errorUpload);
app.post("/file/upload", controller.upload);
app.get("/readFile/:id", controller.readFile);

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }
  console.log("Server is running successfully at port: ", port);
});
