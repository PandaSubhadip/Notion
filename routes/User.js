const express = require("express");
const router = express.Router();
const {
    login,
signup,
sendOtp,
changePassword,

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
  router.post("/login",login);
   //                                           Route for Signup                        //
   router.post("/signup",signup);
   //                                           Route for Otp                        //
   router.post("/sendotp",sendOtp);
   //                                           Route for Change password                        //
   router.post("/changepassword",auth,changePassword);

   //                                           Route for Reset Token                       //
    router.post("/resetPasswordToken",resetPasswordToken);
    //                                           Route for Resetpassword                        //
    router.post("/resetPassword",resetPassword);

    module.exports = router;