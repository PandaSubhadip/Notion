const express = require("express");
const router = express.Router();
const {
    Login,
Signup,
sendOtp,
ChangePassword,

} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");

// ************************************************************************************************** //
//                                           Authentication Routes                                 
// **************************************************************************************************//
  //                                           Route for Login                        //
  router.post("/login",Login);
   //                                           Route for Signup                        //
   router.post("/signup",Signup);
   //                                           Route for Otp                        //
   router.post("/sendotp",sendOtp);
   //                                           Route for Change password                        //
   router.post("/changepassword",auth,ChangePassword);

   //                                           Route for Reset Token                       //
    router.post("/resetPasswordToken",resetPasswordToken);
    //                                           Route for Resetpassword                        //
    router.post("/resetPassword",resetPassword);

    module.exports = router;