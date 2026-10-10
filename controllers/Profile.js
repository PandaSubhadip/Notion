   const Profile = require("../models/Profile");
   const User = require("../models/Users");

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
                success:false,
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


     exports.getAllUserDetials = async(req,res)=>{
        try {
            //Get id
            const id = req.user.id;
            // Validation and get user detials
            const userDetials = await User.findById(id).populate("additionalDetails").exec();
            
            // return response here
              return res.status(200).json({
                    message:"User Data fatched Successfull",
                    success:true
                });

        } catch (error) {
               return res.status(500).json({
                    message:"Error occuerd while fatching the data",
                    success:false,
                    error
                });
        }
     } 