    
    const SubSection = require("../models/SubSection");
    const Section  = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploder");
     
     
     exports.createSubsection = async(req,res) => {
        try {
            // fatch data from req body
            const {SectionId,title,timeDuration ,description} = req.body;

            //  extract file/video
             const video = req.files.videoFile;
            // validation
             if(!SectionId || !title || !timeDuration || !description || !video){
                return res.status(401).json({
                message:"Please provide all fieleds",
                success:false
                });
             }
            // Upload Video to cloudinary
             const uploadDetials = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            // Create a Sub Section
               const subSectionDetials = await SubSection.create({
                title,
                timeDuration,
                description,
                videoUrl:uploadDetials.secure_url
               })
            // update section with this sub section ObejctId
             const updatedSection = await Section.findByIdAndUpdate({_id:SectionId},
                {
                $push:{
                    subSection:subSectionDetials._id
                }
             },
             {new:true}
            )
            // return response
            return res.status(201).json({
                message:"Subsection Created sucessfull",
                success:true,

            });
        } catch (error) {
            return res.status(201).json({
                message:"Subsection Creation failed please try after some time",
                success:false,
                error
                
            })
        }
     }

     //Update subSection
     const updateSubsection = async(req,res)=>{
        try{
            // Get data from req body
            const {subSectionId,title,timeDuration,description} = req.body;
            // video file get
            const video = req.files.videoFile;
            // validation 
            if(!subSectionId || !title || !timeDuration || !description || !video){
                return res.status(403).json({
                    message:"Please provide all fieleds",
                    success:false
                    
                })
            }


        }catch(error){

        }
     }

     // Delete subSection