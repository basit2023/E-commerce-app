import express from 'express';
import Router from './routes/Router.js';
const app=express();
import connectDB from './config/db.js';
import router from './routes/productRouter.js'


import { config } from 'dotenv';
config()
//port 
const PORT =process.env.PORT || 4000
app.use(express.json());
//Connection to MongoDB 
connectDB();

//Routing
app.use('/user',Router)
app.use('/product',router)

app.get('/',(req,res)=>{
    console.log("This is the E-Commercer Application")
    res.send("Hello, this is the E-Commerce Application");
})
//server running


app.listen(PORT,()=>{
    console.log(`The Server is running on PORT ${PORT}`)
    
})