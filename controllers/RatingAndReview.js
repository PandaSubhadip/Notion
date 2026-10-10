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
   exports.getAverageRating = async(req,res)=>{
    try{
         // Get  course id 
         const {couseId}= req.body;
         // Calculate avrage rating
         const result = await RatingAndReview.aggregate([
            {
                $match:{course:new mongoose.Types.ObjectId(couseId)

                },
                
                },
                {
                    $group:{
                        _id:null,
                        avarageRating:{$avg:$rating},
                    }
            }
         ])
           // return response
           if(result.length>0){
            return res.status(200).json({
                
                success:true,
                avarageRating:result[0].avarageRating
            })
           }
           // if no rating found
           return res.status(200).json({
            message:"No rating founs for  this course till now",
            success:true,
            avarageRating:0
           });
    } catch(error){
        return res.status(500).json({
            message:"unable to get avarage rating",
            success:false,
            error
        })
    }
   }


   //getAllrating
    exports.getAllrating = async(req,res)=>{
      try{
        const allreviews = await RatingAndReview.find({}).sort({rating:desc}).populate({
            path:"user",
            select:"firstName lastname email image"
        }) 
       .populate({
        path:"course",
        select:"courseName"
       })
       .exec();
       // return response
       return res.status(200).json({
        message:"All reviews fatched sucessfully",
        success:true,
        data:allreviews
       })
      }
      catch(error){
        return res.status(500).json({
            message:"Unable to get all reviews please try after some time latter",
            success:false,
            message:error.message
        })
      }
    }