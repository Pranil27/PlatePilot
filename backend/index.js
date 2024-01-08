const express = require("express");
require('dotenv').config();
const app = express();
const port=process.env.PORT;
const connectDB= require('./db');
connectDB();

app.get('/',(req,res)=> {
    res.send("Namaste Duniya!");
})

app.listen(port,() => {
    console.log(`Running on port ${port}`);
})