const router = require("express").Router();
const database = require("../schema/model");
const path = require('path');



router.get("/:uudi",async(req,res)=>
{
    try{
    const data = req.params.uudi;
    
     const userdata = await database.findOne({uuid:data});
     
     if(!userdata)
     {
        return res.render("download",{
            error:"this has been expired"
        })
     }

   const filepaths= `${__dirname}/../photo/${userdata.downloadId}.png`;
   
   
  res.download(filepaths);
    
     

    }catch(err)
    {
        console.log(err);
    }
})

module.exports =router;