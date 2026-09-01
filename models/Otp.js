const mongoose = require("mongoose");
const Course = require("./Course");

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
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion",otp);
        console.log("Mail sent sucessfully",mailResponse);
    }catch(error){
       console.log("ERROR IN MOdel otp sent mail",error);
       throw error;
    }

 }
 otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
 })

module.exports = mongoose.model("Otp",otpSchema);