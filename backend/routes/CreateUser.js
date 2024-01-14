const express = require("express");
const router= express.Router();
const User = require("../models/User");
const {body , validationResult} = require("express-validator");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const jwtSecret= process.env.SECRET;


router.post("/createuser",[
    body('email','Incorrect Email').isEmail(),
    body('name').isLength({min:5}),
    body('password','Incorrect Passwordd').isLength({min:5})
] , async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const secured_password = await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secured_password
        });
        res.json({success:true});
    } catch (err){
        console.log(err);
        res.json({success:false});
    }
});

router.post("/loginUser",[
    body('email','Incorrect Email').isEmail(),
    body('password','Incorrect Passwordd').isLength({min:5})
] , async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

    try {
        const email=req.body.email;
        let userData = await User.findOne({email});

        const confirmPwd = await bcrypt.compare(req.body.password,userData.password);
        
        if(!userData || !(confirmPwd)){
            return res.status(400).json({errors:"Incorrect Credentials"});
        }

        const data={
            user:{
                id:userData.id
            }
        }

        const authToken = jwt.sign(data,jwtSecret);

        res.json({success:true,authToken:authToken});
    } catch (err){
        console.log(err);
        res.json({success:false});
    }
});

module.exports = router