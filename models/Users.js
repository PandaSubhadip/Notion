const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},

    courses: [
        {
           type:mongoose.Schema.Types.ObjectId,
            required:true,  
            ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token:{
      type:String
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]

});
 module.exports =mongoose.model("User",userSchema);