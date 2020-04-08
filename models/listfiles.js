const mongoose = require('mongoose');

const listSchema=new mongoose.Schema({
    csvFiles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CsvFile"
    }]
})

const List = mongoose.model('List',listSchema);

module.exports=List;