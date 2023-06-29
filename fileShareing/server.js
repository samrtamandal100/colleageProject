require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.Port || 3000
require("./Database/conn");
const path = require("path")



app.set("view engine","ejs");
app.use(express.json());

app.use("/css" , express.static(path.join(__dirname,"public/css")))
app.use("/img", express.static(path.join(__dirname,"public/img")))
 // file route
app.use('/app/file',require('./routes/file'));
app.use('/file',require('./routes/showDownload'));
app.use('/file/download',require('./routes/download'));


app.listen(port ,()=>
{
    console.log(`${port} successfully run`)
})