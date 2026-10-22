const express = require("express");
const router = express.Router();
const {
    updateProfile,
   deleteAccount,
   getUserDetials,
   updateProfilePicture

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
   //                                           Route for updateProfilePicture route                       //
   router.post("/updateProfilePicture",auth,updateProfilePicture);

   //                                           Route for Updateprofile picture route                       //
   router.post("/updateProfilePicture",auth,updateProfilePicture);
  

  module.exports = router;