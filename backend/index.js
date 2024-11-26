import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000 

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
})