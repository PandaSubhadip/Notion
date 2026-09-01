const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

   
   //Create Rating 
       exports.createRating =async (req,res)=>{
        try {
            //get User Id
            const userId = req.user.id;
            //fatched from req
            const {rating,review,courseId} = req.body;
            // checked user enrolled or not
            const courseDetials = await Course.findOne({
                _id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}}
            });
            if(!courseDetials){
                return res.status(404).json({
                    "message":"Student not enrolled in this course",
                    success:false
                })
            }
            // Check user allready review or not
               const allreadyReview =  await RatingAndReview.findOne({
                user:userId,
                course:courseId


               });
               if(allreadyReview){
                return res.status(400).json({
                    message:"Student already reviewed this course",
                    success:false
                });
               }
            // create rating and review
            const ratingReview = await RatingAndReview.create({
                rating,
                review,
                course:courseId,
                user:userId
            })
            // update course with rating and review
             const updatedCourse =  await Course.findByIdAndUpdate(courseId,{
                $push:{ratingAndReview:ratingReview._id}
            },
         {new:true});
         connsole.log("Updated Course",updatedCourse);
             // return response
             return res.status(201).json({
                message:"Rating and review created successfully",
                success:true,
                ratingReview
             })
        } catch (error) {
           return res.status(500).json({
                message:"unable to create rating and review",
                success:false,
                error
             });
        }
       }


   //GET avarage rating



   //getAllrating