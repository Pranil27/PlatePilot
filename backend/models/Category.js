const mongoose = require("mongoose");

const {Schema} =mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('food_category',CategorySchema);