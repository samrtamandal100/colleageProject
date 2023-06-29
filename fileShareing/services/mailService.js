const nodemailer = require("nodemailer");
const config = require("../config/config");

module.exports = async({from ,to ,subject ,text ,html})=>{

    const transpoter = nodemailer.createTransport({
        host:process.env.Host_name,
        port:process.env.Host_port,
        secure:false,
        auth:{
            user:config.emailUser,
            pass:config.emailPassword
        }
    })

    const maildata = await  transpoter.sendMail({
        from :from,
        to: to,
        subject:subject,
        text:text,
        html:html
    })
    
}