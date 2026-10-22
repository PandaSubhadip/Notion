   const Profile = require("../models/Profile");
   const User = require("../models/Users");
   const { uploadImageToCloudinary } = require("../utils/imageUploder");

    exports.updateProfile = async (req,res)=>{
        try {
            // Get data
            const {gender,dateOfBirth="",about="",contactNumber}= req.body;
            // Get UserId
             const id = req.user.id;
           // validation
            if (!gender || !dateOfBirth || !about || !contactNumber){
               return res.status(403).json({
                message:"Please Provide all fields",
                success:false
               });

            }
              // find profile
              const userDetials = await User.findById(id);
            //update profile 
            const profileId = userDetials.additionalDetails;
            const profileDet = await Profile.findById(profileId);

            // Update profile
            profileDet.dateofbirth = dateOfBirth;
            profileDet.about = about ;
            profileDet.gender = gender ;
            profileDet.contactNumber = contactNumber ;
            await profileDet

            // return response
            return res.status(201).json({
                message:"Profile Updated Sucessfull",
                success:true,
                profileDet
            })
        } catch (error) {
              return res.status(501).json({
                message:"Unable to update profile",
                success:false,
                error
            })
        }
    }
    
        
     

     exports.deleteAccount = async(req,res)=>{
        try {
            // Get Id
            const id = req.user.id;
            // Validation
           const userDetials = await User.findById(id);
           if(!userDetials){
              return res.status(404).json({
                message:"User Not found ",
                success:false
              })
           }
            // delete profile
            await Profile.findByIdAndDelete({_id:userDetials.additionalDetails});
            // delete user
            await User.findByIdAndDelete({_id:id});
            // Un-enroll user form all enrolled course
            // return response
                return res.status(200).json({
                    message:"User Deleted Successfull",
                    success:true
                });
        } catch (error) {
              return res.status(500).json({
                    message:"user can't be delete please try after some time latter",
                    success:false
                });
        }
     }


     exports.getUserDetials = async(req,res)=>{
        try {
            //Get id
            const id = req.user.id;
            // Validation and get user detials
         const userDetails = await User.findOne({ _id: id })
         .populate("additionalDetails")
          .exec(); 
            // return response here
              return res.status(200).json({
                    message:"User Data fatched Successfull",
                    success:true,
                   data: userDetails
                });

        } catch (error) {
               return res.status(500).json({
                    message:"Error occuerd while fatching the data",
                    success:false,
                    error
                });
        }
     } 

  exports.updateProfilePicture = async(req, res) => {
    try {
        // Get id.....
        const { id } = req.user;
       
        // 1. FIX: Check if files exist BEFORE extracting the photo file
        if (!req.files || !req.files.photo) {
            return res.status(400).json({
                success: false,
                message: "No profile picture was uploaded. Please attach a file using the field key 'photo'."
            });
        }
           
        // 2. SAFE NOW: Extract the photo file after verifying it exists
        const photoFile = req.files.photo;

        // 3. Upload to Cloudinary using the correct object variable name
        const uploadPhoto = await uploadImageToCloudinary(photoFile, process.env.FOLDER_NAME);
        console.log("UploadPhoto", uploadPhoto);

        // 4. Update Database
        const userupdate = await User.findByIdAndUpdate(
            { _id: id },
            { image: uploadPhoto.secure_url },
            { new: true }
        );

        return res.status(200).json({
            message: "User Profile Picture Updated Successfully",
            success: true,
            data: uploadPhoto.secure_url
        });

    } catch (error) {
        // PRO-TIP: Log the error on your terminal so you can read exactly what went wrong
        console.error("Upload Route Error:", error);

        return res.status(500).json({
            message: "Error occurred while Updating the profile picture",
            success: false,
            error: error.message // Sending error.message back reveals the clean, readable error text
        });
    }
};
