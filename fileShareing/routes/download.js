const router = require("express").Router();
const database = require("../schema/model");

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
    
     

    }catch(err)
    {
        console.log(err);
    }
})

module.exports =router;