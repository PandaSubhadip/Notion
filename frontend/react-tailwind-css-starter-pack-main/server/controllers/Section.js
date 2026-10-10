 const Section = require("../models/Section");
 const Course = require("../models/Course");


 exports.createSection = async (req , res) =>{
    try {
        // data fatch 
        const {sectionName,  courseId} = req.body;

        // data validation
          if(!sectionName || !courseId){
            return res.status(400).json({
                message:"Missing Properties",
                success:false
            })
          }
        // create section 
        const newSection = await Section.create({sectionName});
        // update Course with section objectId
        const updateCourse = await Course.findByIdAndUpdate(
  courseId, // 1. First argument: Just the ID string
  {
    $push: { courseContent: newSection._id } // 2. Second argument: The update operation
  },
  { new: true } // 3. Third argument: Options
).populate({
  path: "courseContent", // 4. Populates the Sections array
  populate: {
    path: "subSection" // 5. Deep-populates SubSections inside each Section
  }
});

        // Use populate to replace  section/sub-section both in the updated courseDetials

         // return response
         return res.status(201).json({
          success:true,
          message:"Section created Sucessfully",
          updateCourse
         })
   

    } catch (error) {
       return res.status(500).json({
          success:false,
          message:"Unable to create  while creating section",
          error
         })
        
    }

 }
   
  
    
  exports.updateSection = async (req,res)=>{
     try {
         //data input
         const {sectionName,sectionId} =  req.body;
         // validation 
         if(!sectionId || !sectionName){
          return res.status(403).json({
            message:"Please Provide all detials",
            success:false
          })
         }
         // Update data 
         const updatedData = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true
 }
         ) 
         //  return res
         return res.status(201).json({
          message:"Updation Sucessfull",
          success:true,
          updatedData
         })
     } catch (error) {
         return res.status(500).json({
          success:false,
          message:"Unable to update  section please try after some time",
          error
         })
     }
  }

   exports.deleteSection = async (req,res)=>{
    try {
      //Get ID- asuming that we are sending ID in params
       const {sectionId} = req.body;
      // find And update and delete
      const deleteSection = await Section.findByIdAndDelete(sectionId);
      // we need to delet entery for course Schema
      // return response
       return res.status(201).json({
        message:"Your Section delete sucessfully",
        success:true,
       });
    } catch (error) {
        return res.status(501).json({
        message:"Unable  to delete Section",
        success:false,
        error
       })
    }
   }