  const {instance} =  require("../config/razorpay");
  const User = require("../models/Users");
  const Course = require("../models/Course");  

   const mailSender = require("../utils/mailSender");



   // capture the payment and iniate the razorpay
    exports.capturePayment =async (req ,res)=>{
        try {
            // get courseid
            // validation
            //valid course id
            //valid course detials
            // user already pay for same cours
            // order create 
            // return response

        } catch (error) {
            
        }
    }