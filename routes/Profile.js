const express = require("express");
const router = express.Router();
const {
    updateProfile,
   deleteAccount,
   getAllUserDetials

} = require("../controllers/Profile");


// ************************************************************************************************** //
//                                           Profile  Routes                                 
// **************************************************************************************************//
  //                                           Route for Update Profile route                        //
  router.post("/updateProfile",updateProfile);
   //                                           Route for delete Account                       //
   router.post("/deleteAccount",deleteAccount);
   //                                           Route for All user route                       //
   router.post("/getAllUserDetials",getAllUserDetials);
  
  

  module.exports = router;