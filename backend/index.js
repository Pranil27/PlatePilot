const express = require("express");
require('dotenv').config({path : './vars/.env'});
const app = express();
const port=process.env.PORT;
const connectDB= require('./db');
connectDB();

app.get('/',(req,res)=> {
    res.send("Namaste Duniya!");
});

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api",require("./routes/CreateFood"));
app.use("/api",require("./routes/CreateOrder"));

app.listen(port,() => {
    console.log(`Running on port ${port}`);
})