const mongoose = require("mongoose");
require("dotenv").config();

exports. connectDB=async() => { 
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Conection Sucessfully")
        
    } catch (error) {
        console.log("It is an error while connecting to db",error)
        process.exit(1);  
    }
}