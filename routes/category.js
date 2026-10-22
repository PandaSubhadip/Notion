const express = require("express");
const router = express.Router();
const {
   createCategory,
    showAllCategory,
    categoryPageDetials
} = require("../controllers/Category");
 const {isInstructor}= require("../middlewares/auth");
  const {auth}= require("../middlewares/auth");


// ************************************************************************************************** //
//                                           CategoryPage  Routes                                 
// **************************************************************************************************//
  //                                       createCategory  Route for Update Profile route                        //
  router.post("/createCategory",auth,isInstructor,createCategory);
   //                                    showAllCategory   Route for delete Account                       //
   router.post("/showAllCategory",auth,isInstructor,showAllCategory);
   //                                       categoryPageDetials Route for userDetials route                       //
   router.post("/categoryPageDetials",auth,isInstructor,categoryPageDetials);


  module.exports = router;