import express from 'express'
import colors from 'colors'
import morgan from 'morgan';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';

const app = express();
//dotenv config
config();
//mongodb connection
connectDB();

//rest object
app.use(cors());

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/user", userRouter)
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);


//POrt
const port = 3002;
//listen port
app.listen(port, ()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.cyan.yellow)
})



