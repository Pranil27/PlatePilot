const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post("/createOrder",async(req,res) => {
    let data = req.body.orderData;

    await data.splice(0,0,{Order_Date : req.body.order_date});

    let emailId = await Order.findOne({'email' : req.body.email});

    if(emailId === null){
        try {
            await Order.create({
                email:req.body.email,
                orderData:[data]
            }).then(() => {
                res.json({success:true});
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server error",error.message);
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{orderData: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server error",error.message);
        }
    }
});


router.post("/myOrderData",async(req,res) => {
    try {
        let myData = await Order.findOne({'email':req.body.email});
        
        res.json({orderData:myData});
    } catch (error) {
        res.send("Server error",error.message);
    }

})

module.exports = router