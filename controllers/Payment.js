  const {instance} =  require("../config/razorpay");
  const User = require("../models/Users");
  const Course = require("../models/Course");  

   const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");



   // capture the payment and iniate the razorpay
    exports.capturePayment = async (req ,res)=>{
        try { 
            // get courseid 
            const {CourseId} = req.body;
            const id  = req.user.id;
            // validation start
            if(!CourseId){
                return res.status(403).json({
                    message:"CourseId Is not added",
                    success:false
                })
            }
            //valid course id
             const course = await Course.findById(CourseId);
             if(!course){
                return res.status(403).json({
                    message:"Could not find course"
                })
             }
                // user already pay for same cours
                const uid = new mongoose.Types.ObjectId(id);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(200).json({
                        message:"User already buy this course ",
                        success:false
                    })
                }

            //valid course detials
            
            // order create 
            const amount = course.price;
            const currency ="INR";
            const option = {
                amount: amount * 100,
                currency,
                recieipt:Math.random(Date.now()).toString(),
                notes:{
                    courseId:course._id,
                    id,
                }
            }

             try {
                const paymentResponse = await instance.orders.create(option);
                console.log(paymentResponse);
                return res.status(200).json({
                    success:true,
                    courseName:course.courseName,
                    courseDescription:course.courseDescription,
                    thumbnail:course.thumbnail,
                    ordersID:paymentResponse.id,
                    currency:paymentResponse.currency,
                    amount:paymentResponse.amount

                });
             } catch (error) {
                  return res.status(403).json({
                    success:false,
                    message:"order creation failed"
                    

                })
             }
            // return response

        } catch (error) {
              return res.status(500).json({
                    success:false,
                    message:"order creation failed"
                    

                })
        }
    }

      
    exports.verifySignature =async(req,res)=>{
       try {
        const webhookSecret = "12345678";
        const signature = req.header["x-razorpay-signature"];
        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if(signature === digest){
            console.log("Payment is authorised");
            const {userId, courseId} = req.body.payload.payment.entity.notes;
            
        }


       } catch (error) {
        
       }
    }
const {instance} = require("../config/razorpay");
const User = require("../models/Users");
const Course = require("../models/Course");  
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const crypto = require("crypto");
exports.capturePayment = async (req, res) => {
    try {
        const { CourseId } = req.body;
        const id = req.user.id; // from auth middleware

        if(!CourseId){
            return res.status(400).json({ success:false, message:"CourseId is required" });
        }

        const course = await Course.findById(CourseId);
        if(!course){
            return res.status(404).json({ success:false, message:"Could not find course" });
        }

        // check already enrolled - string compare karo
        if(course.studentsEnrolled.includes(id)){
            return res.status(200).json({ success:false, message:"User already bought this course" });
        }

        const options = {
            amount: course.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}_${Math.random().toString().slice(2,8)}`,
            notes:{
                courseId: CourseId,
                userId: id, // yahi naam verify me use karna
            }
        }

        const paymentResponse = await instance.orders.create(options);
        
        return res.status(200).json({
            success:true,
            courseName: course.courseName,
            orderId: paymentResponse.id, // frontend pe yehi lagega
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success:false, message:"Order creation failed" });
    }
}
 

exports.verifySignature = async (req, res) => {
   try {
        const webhookSecret = process.env.WEBHOOK_SECERET;
        const signature = req.headers["x-razorpay-signature"];
        
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("Payment is Authorised");
            
            const { userId, courseId } = req.body.payload.payment.entity.notes;

            // Ab main kaam karo:
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            const enrolledUser = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId } },
                { new: true }
            );

            // email bhej do
            await mailSender(
                enrolledUser.email,
                "Course Enrolled",
                `You are enrolled in ${enrolledCourse.courseName}`
            );

            return res.status(200).json({ success: true, message: "Payment verified and enrolled" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
   } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Verification failed" });
   }
}