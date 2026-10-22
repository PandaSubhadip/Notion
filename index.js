const express = require("express");
const app = express();
  const dotenv = require("dotenv");
  dotenv.config();
const userRoute = require("./routes/User");
const courseRoute = require("./routes/course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
   const categoryRoute = require("./routes/category");

  const database = require("./config/db");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const {CloudinaryConnect} = require("./config/Cloudinary");
  const fileUploader = require("express-fileupload");

    
  // Database Connection
  database.connectDB();
  // middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
  })
);
  app.use(fileUploader({
    useTempFiles:true,
    tempFileDir:"/tmp/",
  })
)
  // cloudinary connection
  CloudinaryConnect();
  const PORT = process.env.PORT || 4000 ;
 

    //Routes 
     app.use("/api/v1/auth",userRoute);
     app.use("/api/v1/course",courseRoute);
     app.use("/api/v1/profile",profileRoute);
     app.use("/api/v1/payment",paymentRoute);
     app.use("/api/v1/category",categoryRoute);

      // By deafult route
      app.get("/",(req,res)=>{
        return res.status(200).json({
            success:true,
            message:"Your server is running ......."
        })
      })
   app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
   })