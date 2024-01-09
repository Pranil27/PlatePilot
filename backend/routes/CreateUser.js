const express = require("express");
const router= express.Router();
const User = require("../models/User");
const {body , validationResult} = require("express-validator")
router.post("/createuser",[
    body('email','Incorrect Email').isEmail(),
    body('name').isLength({min:5}),
    body('password','Incorrect Password').isLength({min:5})
] , async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:req.body.password
        });
        res.json({success:true});
    } catch (err){
        console.log(err);
        res.json({success:false});
    }
});

module.exports = router