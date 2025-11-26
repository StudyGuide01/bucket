import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { createChannel, getOwnerChannel, subscribe } from '../controller/channel.controller.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/create-channel',upload.fields([
    {name:'photo',maxCount:1},
    {name:'banner',maxCount:1}
]),isAuth,createChannel);

router.get('/getChannel',isAuth,getOwnerChannel);
router.post('/subscribe/:id',isAuth,subscribe);

export default router;