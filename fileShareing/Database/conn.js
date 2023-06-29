const mongoose  = require("mongoose");
const url = process.env.DB_URL
mongoose.connect(url,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log("connected successfull")
}).catch((err)=>
{
    console.log(err)

})