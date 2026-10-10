 const Course = require("../models/Course");
 const user = require("../models/Users");
 const Tag = require("../models/Category");
   const {uploadImageToCloudinary} =  require("../utils/imageUploder");
const Course = require("../models/Course");
const { populate } = require("dotenv");
  
    // create course start here
   exports.createCourse = async(req,res)=>{
     try {
        // fatch data always first
        const{courseName, courseDescription, whatYouWillLearn,price,tag} = req.body;

        //Get Thumbanil 
        const thumbnail = req.files.thumbnail;
        // validation 
       if( !courseName || !courseDescription ||  !whatYouWillLearn || !price || !tag || !thumbnail){
        return res.status(400).json({
            message:"All fieleds are required",
            success:false
        })
       }

        // check User role is Instuctor or other
        const userId = req.user.id;
        const instructor = await user.findById(userId);
        console.log("Instuctor Detials :",instructor);
        // throwing error if user not exiest
      if(!instructor){
        return res.status(400).json({
            message:"Instructor Not Found",
            success:false
        })
      }
        // Tag validation chk 
        const tagvalid = await Tag.findById(tag); 
        if(!tagvalid){
            return res.status(400).json({
                message:"Tag Is not valid please use valid tag",
                success:false
            })


        }
        //Upload Img to cloudinary
        const thubnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        // Create entry in db
        const courseDb =  await Course.create({
            courseName,
            courseDescription,
            instructor:instructor._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagvalid._id,
            thumbnail:thubnailImage.secure_url
        })
        // add new course to user Schema 
        await user.findByIdAndUpdate(
            {id:instructor._id},
            {
                $push: {
                    courses:courseDb._id
                },
                
            },
            {new:true}
        );
        // Update Tag Schema
        await Tag.findByIdAndUpdate({id:tagvalid._id},
            {
                $push:{
                     courses:courseDb._id
                }
            },
           {new:true}
        )

        // return response
         return res.status(201).json({
            success:true,
            message:"Course created Sucessfully",
            data:courseDb
         })
           

     } catch (error) {
           return res.status(500).json({
            success:false,
            message:"failed when you try to create course",
            error
         })
     }
   }

// show all course
   exports.showAllCourse = async(req,res)=>{
    try {
        const allCourse = await Course.find({},
            {
                courseName:true,
                thumbnail:true,
                price:true,
                instructor:true,
                ratingAndReview:true,
                studentsEnrolled:true
            }
        ).populate("instructor")
        .exec()
         return res.status(201).json({
            success:true,
            message:"Course Fatched  Sucessfully",
            data:courseDb
         })
    } catch (error) {
          return res.status(501).json({
            success:true,
            message:"can't fatch course Sorry",
            error
         })
    }
   }
   ///get course detials
   exports.getCourseDetials = async (req,res)=>{
    try {
        // Get course id from req
        const {coursId} = req.body;
        const Coursedetials = await Course.find({
            _id:coursId
        }).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetials"
                }
            }
        )
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        .exec();
        if(!Coursedetials){
            return res.status(400).json({
                message:`Coudn't fatch any course,${coursId}`,
                success:false
            });
           
        }
         return res.status(201).json({
                message:"Course fatched",
                success:true
            })
    } catch (error) {
        return res.status(500).json({
            message:"Error in while fatching course",
            success:false
        });
    }
   }

