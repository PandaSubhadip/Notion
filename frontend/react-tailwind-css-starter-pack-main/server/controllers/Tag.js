  const Tag = require("../models/Category");


  exports.createTag = async(req ,res)=>{
    try {
        // fatch data
        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(403).json({
                message:"All field are required ",
                success:false
            })
        }
        //Create entery
        const tagDetials = await Tag.create({
            name,
            description
        })

        return res.status(201).json({
            message:"Tag Created Sucessfully ",
            success:true
        })
    } catch (error) {
          console.log("this error occued in Tag creation",error);
          return res.status(501).json({
            message:"Error occuerd in while Creating Tag ",
            success:false
        })
    }
  }

  exports.showAllTag = async (req,res) =>{
    try {
        //fatch all taag
        const allTag = await Tag.find({},{name:true, description:true});
        return res.status(200).json({
            message:"All tag return Sucessfully",
            success:true,
            allTag
        })
    } catch (error) {
         return res.status(500).json({
            message:"This error occured for while tag returning ",
            success:false,
           error
        })
        
    }

  }