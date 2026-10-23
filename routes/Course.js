const express = require("express");
const router = express.Router();
const {
  createCourse,
  showAllCourse,
  getCourseDetials

} = require("../controllers/Course");
const {
  createSection,
  updateSection,
   deleteSection
} = require("../controllers/Section");
const {
  createSubsection,
  updateSubsection,
  DeleteSubsection
} = require("../controllers/SubSection")
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


   // ************************************************************************************************** //
//                                           Section Routes                                 
// **************************************************************************************************//

   //                                           Route for  createSection                        //
   
   
   router.post("/createSection",createSection);

    //                                           Route for  updateSection                        //
   
   router.post("/updateSection",updateSection);
    
   //                                           Route for  deleteSection                        //
   
   router.post("/deleteSection",deleteSection);
      
   // ************************************************************************************************** //
//                                            SubSection Routes                               
// **************************************************************************************************//
    
    //                                           Route for  createSubsection                        //
   
   router.post("/createSubsection",createSubsection); 
     
     //                                           Route for  updateSubsection                        //
   
   router.post("/updateSubsection",updateSubsection);
     
     //                                           Route for  DeleteSubsection                        //
   
   router.post("/DeleteSubsection",DeleteSubsection);

  module.exports = router;