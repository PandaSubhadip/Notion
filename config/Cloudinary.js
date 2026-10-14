 const cloudinary = require("cloudinary").v2;

 exports.CloudinaryConnect = async ()=>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECERET,
        })
    }
    catch(error){
        console.log("Error in cloudinary connection ,",error);
    }
 }