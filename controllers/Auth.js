       const User = require("../models/Users");
        const Otp = require("../models/Otp");
        require("dotenv").config();
        const otpGenerator = require("otp-generator");
       const becrypt = require("bcrypt");
const Profile = require("../models/Profile");


//Send OTP
exports.sendOtp = async(req,res)=>{
    try{
        //fetch email from request body
        const {email} = req.body;
        // Check User already exiest or not
        const ChkUser = await User.findOne({email});
        if(ChkUser){
            return res.status(401).json({
                success:false,
                message:"User already registerd"
            })
        }
        // Genarate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("OTP Generated Sucessfull",otp);

        // Check Unique otp or not
        let result = await Otp.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        result = await Otp.findOne({Otp:otp});
        }
        const otpPayload = {email,otp}
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody)
        return res.Status(200).json({
            success:true,
            message:"Otp Sent Sucessfully",

        })

    }
    catch(error){
        console.log("Please check the error on while ganerate otp",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}


// Signup   
  exports.Signup= async(req,res)=>{
    try {
        // Data Fatch 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPasword,
            accountType,
            contactNumber,
            otp

        } = req.body;
        //Validition
        if( !firstName || !lastName || !email   || !password || !confirmPasword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fieleds are required"
            })
        }       
           
        // Two password match
        if(password !== confirmPasword){
            return res.status(400).json({
                message:"Password and confirm Password doesn't Match",
                success:false
            })
        }


        //Check User already exist or not
        const existingUser = await findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exiest Please Login",
                success:false

            })
        }

        // find most recent otp
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent Otp",recentOtp)
        // validate Otp
        if(recentOtp.length == 0){
            return res.status(400).json({
                message:"Otp Not Found",
                success:false
            }) 

            }  else if (recentOtp.otp !== otp){
                  return res.status(400).json({
                message:"Otp Not Match",
                success:false
            })
        }
        //Hash password
        const hashPassword = await becrypt.hash(password,10);
        //Entery Created db
         const profdb = await Profile.create({
            gender:null,
            dateofbirth:null,
            about:null,
            contactNumber:null

         })
        const savedb = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            confirmPasword,
            accountType,
            contactNumber,
            otp,
            additionalDetails:profdb.id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName},`
        })
        //return response
        return res.status(201).json({
            message:"User registerd Sucessfully",
            success:true,

        })


    } catch (error) {
        console.log("Error occured in signup controler",error);
         //return response
        return res.status(501).json({
            message:"User creation failed please chack Input",
            success:true,
         })
    }

  }



//Login 
exports.Login = async (req,res)=>{
    try {
        // Get data from req
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(400).json({
                message:"Please Provide all Fieleds",
                success:false
            })
        }
        //User Check  exiest or not
        const user = await User.findOne({email}).populate("additionalDetials");

        if(!user){
            return res.status(401).json({
                message:"User Not registerd Please Signup then Try",
                success:false
            })
        }
        // generate Jwt  after password matchin
        if(await becrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            } )
            user.token = token;
            user.password = undefined;
       

        // create a cookies and send response
        const options = {
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        } 
        // Sucess response 
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"Loged In Sucessfully ",
            token,
            user

        })
         }else{
             return res.status(400).json({
            message:"Password is incorrect Please try again ",
            success:false
        })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Loged In failed ",
            success:false
        })
    }
}


// Change Password

exports.ChangePassword =  async (req,res)=>{
    try {
        //get data from req body
        // get old Password new password confirm password
        // validation
      //  Update password in db
      // send mail to Password updated
      // return response
        
    } catch (error) {
        
    }
}