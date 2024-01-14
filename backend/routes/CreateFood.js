const express = require("express");
const router= express.Router();
const Food = require("../models/Food");
const Category = require("../models/Category");



router.post("/createfood",async (req,res) => {

    try {
        await Food.create({
            categoryName:req.body.categoryName,
            name:req.body.name,
            img:req.body.img,
            description:req.body.description,
            options:req.body.options
        });
        res.json({success:true});
    } catch (err){
        console.log(err);
        res.json({success:false});
    }
});

router.post("/foodData",(req,res) => {
    try {
        res.send([global.food_items,global.foodCategory]);
    } catch (error) {
        console.error(error);
        res.send("Server Error!");
    }
})

router.post("/addCategory",async(req,res) => {
    try {
        await Category.create({
            name:req.body.name
        });
        res.json({success:true});
    } catch (error) {
        console.error(error);
        res.json({success:false});
    }
})


module.exports = router