const mongoose = require('mongoose');

const multer=require('multer');

const path=require('path');
const FILE_PATH=path.join('/uploads/folders');


const csvSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    csvFile:{
        type:String
    }
})

let storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,'..',FILE_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

csvSchema.statics.uploadedFile=multer({storage:storage}).single('CsvFile');
csvSchema.statics.filePath=FILE_PATH;

const CsvFile=mongoose.model('CsvFile',csvSchema);
module.exports=CsvFile;