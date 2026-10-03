 const jwt = require("jsonwebtoken");
 require("dotenv").config();

// auth 
exports.auth = async ( req, res, next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header ("Authorisation").replace("Bearer" ,"");
        if(!token){
            return res.status(400).json({
                message:"Token Is  Mising",
                success:false
            })
        
            }
             const decode = await jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decode:",decode);
                req.user = decode;
       
       
      next();
    
    } catch (error) {
      
        return res.status(501).json({
            message:"Somthing Went wrong while validating token",
            success:false
        })
    
}

}

// isStudennt

  exports.isStudent =  async(req,res,next)=>{
    try {
        //check the role of user
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This Protected routes only for Students "
            })
            next();
        }

        
    } catch (error) {
          return res.status(501).json({
            message:"User role not verified,Please try again",
            success:false
        })
    }
  }
 


//isInstructor
  
    exports.isInstructor =  async (req,res,next)=>{
    try {
        //check the role of user
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This Protected routes only for Instructor "
            })
        }
          next();
        
    } catch (error) {
          return res.status(501).json({
            message:"User role not verified,Please try again",
            success:false
        })
    }
  }



//isAdmin
 exports.isAdmin =  async(req,res,next)=>{
    try {
        //check the role of user
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This Protected routes only for Admin "
            })
        }

         next();
    } catch (error) {
          return res.status(501).json({
            message:"User role not verified,Please try again",
            success:false
        })
    }
}