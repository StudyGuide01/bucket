import express from 'express';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { uploadVideo } from '../controller/video.controller.js';
const router = express.Router();

router.post('/create-video/:id',isAuth,upload.fields([
{name:'videoUrl',maxCount:1},
{name:'thumbnail',maxCount:1}
]),uploadVideo)
export default router;