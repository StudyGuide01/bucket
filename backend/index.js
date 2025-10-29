import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dbConnection from './config/db.js';
dotenv.config();
const app = express();

const port  = process.env.PORT || 2025;

app.use(cookieParser());
//routes

import userRouter from './routes/user.router.js';
import channelRouter from './routes/channel.routr.js';
import videoRouter from './routes/video.router.js';


//configure for get data form body
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const corsOrigin = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOrigin));


app.use('/api/v1/user',userRouter);
app.use('/api/v1/channel',channelRouter);
app.use('/api/v1/video',videoRouter)



dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("❌ Error connecting to database:", error);
  });
