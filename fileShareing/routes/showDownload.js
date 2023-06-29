const router = require("express").Router();
const database = require("../schema/model");



router.get("/:uudi", async(req,res)=>
{
   try{
    const uuidData = req.params.uudi;

    const finddata = await database.findOne({uuid:uuidData});
    if(!finddata)
    { 
      
       
        return res.render("download",{error:"link has been expired"});
    }
    res.render("download",{
        fileName:finddata.fileName,
        fileSize:finddata.size,
        DownloadLink:`/file/download/${finddata.uuid}`



    })
   }catch(error)
  {  
    return res.render("download",{error:"Something Worng Happen"});
  }
})

module.exports = router;