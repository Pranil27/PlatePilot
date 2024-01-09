const mongoose = require("mongoose");
const mongoURI=process.env.MONGO_URI;
const connectDB=async()=>{
    try{
        await mongoose.connect(mongoURI,{useNewUrlParser:true});
        console.log("Connected to db");
        const fetched_data = await mongoose.connection.db.collection("food_item");
        // console.log(fetched_data);
        fetched_data.find({}).toArray((err,data)=>{
            if(err) console.log(err);
            else console.log(data);
        })
    } 
    catch(err)
    {
        console.log(err);
    }
   
}

module.exports = connectDB