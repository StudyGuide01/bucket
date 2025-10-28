import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { createChannel } from '../controller/channel.controller.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/create-channel',upload.fields([
    {name:'photo',maxCount:1},
    {name:'banner',maxCount:1}
]),isAuth,createChannel);

export default router;