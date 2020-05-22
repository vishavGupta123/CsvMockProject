const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");
const FILE_PATH = path.join("/uploads/folders");

const csvSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  csvFilePath: {
    type: String,
  },
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    cb(null, path.join(__dirname, "..", FILE_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

csvSchema.statics.uploadedFile = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("CsvFile");
function checkFileType(file, cb) {
  //Allowed extensions
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: CSV only");
  }
}
csvSchema.statics.filePath = FILE_PATH;

const CsvFile = mongoose.model("CsvFile", csvSchema);
module.exports = CsvFile;
