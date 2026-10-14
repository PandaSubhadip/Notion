const express = require("express");
const router = express.Router();
const {
   capturePayment,
   verifySignature

} = require("../controllers/Payment");


// ************************************************************************************************** //
//                                           Payments   Routes                                 
// **************************************************************************************************//
  //                                           Route for capturePayment route                        //
  router.post("/capturePayment",capturePayment);
   //                                           Route for verifySignature                      //
   router.post("/verifySignature",verifySignature);
   
  
  

module.exports = router;