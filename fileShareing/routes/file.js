
const router = require("express").Router();
const express = require("express");

const multer = require("multer");
const path = require('path')
const FileDataBase = require("../schema/model")
const {v4 : uuidv4} = require('uuid')
const bodyParser = require("body-parser");
const fs = require("fs");
const cloudinary = require("../cloud/cloudnary");
const sendmail = require("../services/mailService")
const https = require("https");



router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: false }));

   const storage = multer.diskStorage({
    fileFilter: (req,file,cb)=>{
         let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".mp4") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
   })


   const upload = multer({storage:storage})
 

router.post("/", upload.single("myfile"),async(req ,res)=>
{
    try{
   
  const uploadResult = await cloudinary.uploader.upload(req.file.path);

      const {originalname,size}= req.file;
      const uu = uuidv4();

    const files = new FileDataBase({
        fileName:originalname,
        uuid:uuidv4(),
        imgLink:uploadResult.secure_url,
        size:size,
        downloadId:uu
        
    })

    const response = await files.save();

    const imageUrl  = response.imgLink;

   
     const file = fs.createWriteStream(`./photo/${uu}.png`);
    
    // Make an HTTP request to fetch the image
    https.get(imageUrl, (response) => {
      // Pipe the response stream into the file stream to save the image
      response.pipe(file);
    
      // Handle successful completion of the request
      response.on('end', () => {
        console.log('Image downloaded successfully.');
      });
    }).on('error', (error) => {
      console.error('Error downloading the image:', error);
    });



    res.render("share",{
        fileName: response.fileName,
        Linke:`${process.env.host_name}/file/${response.uuid}`,
        fileSize:response.size,
        Uuid:response.uuid

    });

    }catch(err){
    res.render("share"),{
        error:err
    }
}
    
})

router.post("/send", async(req,res)=>
{
    const {SenderEmail,ReceverEmail,uuid}= req.body;
    console.log(SenderEmail +' '+ReceverEmail +''+uuid);
    
    try{
        const userdata = await FileDataBase.findOne({uuid:uuid});
        if(userdata.sender)
        {
            return res.status(422).send({error:"Email Already Send"})
        }
        userdata.sender=SenderEmail;
        userdata.reciver=ReceverEmail;
        const response = await userdata.save();
   
        const sendmail = require("../services/mailService");
        sendmail({
            from:SenderEmail,
            to:ReceverEmail,
            subject:"EasyShare",
            text:`${SenderEmail} share a file with you..`,
            html:require("../services/mailTem")({
                emailFrom:SenderEmail,
                downloadLink:`${process.env.host_name}/file/${response.uuid}`,
                size:response.size,
                expires:"24 Houre"


            })

            
        }).then(()=>{
            return res.json({success:true});
        }).catch(()=>
        {
            return res.status(500).json({error:"error mail not sending"})
        })

    }catch(err)
    {
        return res.status(500).send({error:"something worng happen"+ err});
    }
})

router.get("/show", (req ,res)=>
{
    res.render("createposts")
})


module.exports =router


















// const storage = multer.diskStorage({
//   destination:(req,res,cb)=>
//       cb(null,"uploads/"),
  
//      filename: (req ,file ,cb)=>{
//       const uniname = `${Date.now()}-${Math.round(Math.random()* 1E9)}${path.extname(file.originalname)}`;
     
//      cb(null ,uniname);
//      }
// })

// let upload = multer({
//      storage:storage,
//      limits: {fileSize:1000000*10}
// }).single("myfile")