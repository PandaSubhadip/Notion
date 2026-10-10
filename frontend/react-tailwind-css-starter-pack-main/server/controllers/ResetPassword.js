const User = require("../models/Users");
const mailsender =  require("../utils/mailSender");
const becrypt = require("bcrypt")


exports.resetPasswordToken = async(req,res) =>{
    try {
        //Get email from req body
        const {email}= req.body;
        // Check Your email or email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                message:"Your email is not reigested",
                success:false
            })
        }
        //  Generate token
         const token = crypto.randomUUID();

        // Update user by adding  token and expairy
        const updatedDetials = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000
            },
            {new:true}
        )
        // Create Url
         const url= `http://localhost:3000/update-password/${token}`
        // send mail conating the url
        await mailsender (
            email,
            "Password Reset Link",
           ` Password Reset Link: ${url}`
        )
        // return the response
          return res.status(201).json({
            message:"Email sent Sucessfully please check",
            success:true
          })

    } catch (error) {
          return res.status(501).json({
            message:"Somthing went wrong while genrating the Password token ",
            success:false
          })
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        //Data fatch 
        const { password, confirmPassword, token}= req.body;
        //Validation 
        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.status(400).json({
                message:"Token Invalid ",
                success:false
            })
        }
         // get Userdetials from db useing token
       
        if(userDetails.resetPasswordExpires < Date.now()){
              return res.status(400).json({
                message:"Token expaires Please regenerate ",
                success:false
             })   
        }
        // if no entery -invalid token
        //token time Check
        //hash pwd
        const hashPwd = await becrypt.hash(password,10)
        // Password update 
        await User.findOneAndUpdate(
            {token:token},
            {password:hashPwd},
            {new :true}
        )
        // return response 
         return res.status(201).json({
                message:"Password reset Sucessfully ",
                success:true
             })   

    } catch (error) {
        console.log("wrong while send pwd mai",error)
         return res.status(500).json({
                message:"Somthing went wrong while send pwd mail ",
                success:false
             })   
    }
}