const mongoose = require("mongoose");
const mongoURI=process.env.MONGO_URI;
const connectDB=async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to db");
    } 
    catch(err)
    {
        console.log(err);
    }
   
}

module.exports = connectDB