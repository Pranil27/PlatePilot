const mongoose = require("mongoose");
const mongoURI=process.env.MONGO_URI;
const connectDB=async()=>{
    try{
        await mongoose.connect(mongoURI,{useNewUrlParser:true});
        console.log("Connected to db");
        var fetched_food_items= require('./models/Food');
        var fetched_food_category= require('./models/Category');
        
        
        let arr=[],arr1=[];
        
        //const fetched_data = await mongoose.connection.db.collection('users');
        await fetched_food_items.find().then( (item) => {
            arr.push(item);
        })
        global.food_items = arr;
        console.log(global.food_items);
        await fetched_food_category.find().then( (item) => {
            arr.push(item);
        })
        global.food_category = arr;
        console.log(global.food_category);
        
    } 
    catch(err)
    {
        console.log(err);
    }
   
}

module.exports = connectDB