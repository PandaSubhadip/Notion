const express = require("express");
const router = express.Router();
const {
    updateProfile,
   deleteAccount,
   getUserDetials

} = require("../controllers/Profile");
 const {auth}= require("../middlewares/auth");

// ************************************************************************************************** //
//                                           Profile  Routes                                 
// **************************************************************************************************//
  //                                           Route for Update Profile route                        //
  router.post("/updateProfile",auth,updateProfile);
   //                                           Route for delete Account                       //
   router.post("/deleteAccount",auth,deleteAccount);
   //                                           Route for userDetials route                       //
   router.post("/getUserDetials",auth,getUserDetials);
  
  

  module.exports = router;