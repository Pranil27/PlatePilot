const mongoose = require("mongoose");

const {Schema} =mongoose;

const FoodSchema = new Schema({
    categoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        default:["Half","Medium","Full"],
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('food_items',FoodSchema);