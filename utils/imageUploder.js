    const cloudinary = require("cloudinary").v2
   
    
    exports.uploadImageToCloudinary = async function(file,folder,height,qulity){
        const option = {folder}
        if(height){
            Option.height;
        }
        if(qulity){
            Option.qulity
        }
        option.resource_type = "auto";
         const safePath = file.tempFilePath.replace(/\\/g, '/');
        return await  cloudinary.uploader.upload(safePath,option)
    } 