import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config();

//db connection
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

//api
app.use('/api/v1/user', userRoute);

app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
