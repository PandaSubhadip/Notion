const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerification");
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
       required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now (),
        expires:5*60,
       
    },
  

});
 async function sendVerificationEmail(email,otp){
    try{
        const htmlBody = otpTemplate(otp);
        await mailSender(email, "Verification Email from StudyNotion", htmlBody);
        // console.log("Mail sent sucessfully",mailResponse);
    }catch(error){
       console.log("ERROR IN MOdel otp sent mail",error);
       throw error;
    }

 }
 otpSchema.pre("save",async function(){
    await sendVerificationEmail(this.email,this.otp);
   
 })

module.exports = mongoose.model("Otp",otpSchema);