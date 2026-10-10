const nodemailer = require("nodemailer");

const mailSender = async(email,title,body)=>{
    try{
     let transpoter = nodemailer.createTransport({
        host:process.env.MAILHOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
     })
    
     let info = await transpoer.sendMail({
        from:'StudyNotion || Codehelp',
        to:`${email}`,
        subject:`${title}`,
        html: `${body}`
     })
     console.log("Message sent Sucessfully",info);
     return info;

    }
    catch(error){
        console.log("This use occured while sending email please check mailsender",error);
        

    }

}