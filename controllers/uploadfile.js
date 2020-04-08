const CsvFile = require('../models/csv');
const List = require('../models/listfiles');
const Array=[];
const parse = require('csv-parse');
const fs=require('fs');
const path = require('path');
const FILE_PATh=path.join('/uploads/folders');
const CsvToJson = require('csvtojson');
console.log("Hey there");
module.exports.upload=async function(req,res){
    try{
       
       await CsvFile.uploadedFile(req,res,function(err){
            if(err){console.log("multer error",err);
                return;
            }
            let csvFile= CsvFile.create({
                //this is saving the path of the uploaded file
                name:req.file.filename,
                csvFile:req.file.path
            });
            console.log(req.file);
            return res.redirect('back');
        })
    }catch(err){

    }

}
module.exports.index=async function(req,res){
    let csvFile=await CsvFile.find({});
    let Array=[{

    }];
    for(let c of csvFile){
        if(c.csvFile!=undefined){
            Array.push({
                name:c.name,
                csvFile:c._id
            });
        }
    }
    res.render('fileUpload',{
        filename:Array
    })
}
const csvData=[{
    
}];
module.exports.readFile=async function(req,res){
    
    try{
        let csvFile=await CsvFile.findById(req.params.id);
        console.log(csvFile);
        CsvToJson().fromFile(csvFile.csvFile).then(source =>{
            var result=source.map(function(val){
                return val;
            })
        
            
            return res.render('showContents',{
                csvData:result
            });
        })
       
          
    }catch(err){
        console.log(err);
    }
}
