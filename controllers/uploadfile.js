const CsvFile = require("../models/csv");
const List = require("../models/listfiles");
const Array = [];
const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");
const CsvToJson = require("csvtojson");

module.exports.upload = async function (req, res) {
  try {
    CsvFile.uploadedFile(req, res, function (err) {
      if (err) {
        console.log("Multer Error: ", err);
        return res.redirect("/file/upload/?err=" + err);
      }
      console.log(req.file);
      CsvFile.create(
        {
          name: req.body.filename,
          csvFilePath: req.file.path,
        },
        function (err, newFile) {
          if (err) {
            console.log("Error uploading a new file ", err);
            return;
          }
          console.log(newFile);
          return res.redirect("back");
        }
      );
    });
  } catch (err) {
    console.log("Error uploading the file", err);
  }
};
module.exports.index = async function (req, res) {
  let msg = req.query.err;
  let csvFile = await CsvFile.find({});
  console.log(csvFile);
  let Array = [{}];
  for (let c of csvFile) {
    if (c !== undefined) {
      Array.push({
        name: c.name,
        csvFile: c._id,
      });
    }
  }
  res.render("fileUpload", {
    filename: Array,
    msg: msg,
  });
};
const csvData = [{}];
module.exports.readFile = async function (req, res) {
  try {
    let pageNum = req.query.page_num;
    console.log(pageNum + "*******");
    pageNum = parseInt(pageNum);
    let headers;
    let numberOfResultPerPage = 100;
    let csvFile = await CsvFile.findById(req.params.id);
    let numberOfPages;
    let pageNumber = req.query.pageNo;
    console.log(csvFile);
    CsvToJson()
      .fromFile(csvFile.csvFilePath)
      .then((source) => {
        headers = Object.keys(source[(pageNum - 1) * numberOfResultPerPage]);
        console.log(headers);
        numberOfPages = source.length / numberOfResultPerPage;
        var result = source.map(function (val) {
          return val;
        });
        var Array = [{}];
        for (
          let i = (pageNum - 1) * numberOfResultPerPage;
          i < pageNum * numberOfResultPerPage;
          i++
        ) {
          Array.push(result[i]);
        }
        return res.render("showContents", {
          headers: headers,
          csvData: Array,
          nextPageNum: pageNum + 1,
          previousPageNum: pageNum - 1,
          pageNum: pageNum,
          numberOfPages: numberOfPages,
          csvFile: csvFile,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports.errorUpload = function (req, res) {
  console.log(req.query);
  msg = req.query.err;
  res.render("error_upload", {
    msg: msg,
  });
};
