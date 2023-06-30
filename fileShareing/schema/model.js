const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    fileName:{
        type:String,
        require:true
    },
    imgLink:{
        type:String,
        // require:true
    },
    size:
    {
        type:Number,
        require:true
    },
    uuid:{
        type:String,
        require:true
    },
    sender:
    {
        type:String,
        require:false
    },
    reciver :{
        type:String,
        require:false
    }
    ,
    downloadId :{
        type:String
    }
})

module.exports = mongoose.model("File",fileSchema);