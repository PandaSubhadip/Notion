const express = require("express");
const router = express.Router();
const {
  createCourse,
  showAllCourse,
  getCourseDetials

} = require("../controllers/Course");
  const {auth} = require("../middlewares/auth")


// ************************************************************************************************** //
//                                           Course Routes                                 
// **************************************************************************************************//
  //                                           Route for createCourse                        //
  router.post("/createCourse",auth,createCourse);
   //                                           Route for showAllCourse                      //
   router.post("/showAllcourse",showAllCourse);
   //                                           Route for  getallCourse                        //
   
   router.post("/getCourseDetials",getCourseDetials);

   

  module.exports = router;