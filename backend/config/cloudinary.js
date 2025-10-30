// import { v2 as cloudinary} from 'cloudinary';
// import fs from 'fs';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//     cloud_name:process.env.CLOUDE_NAME,
//     api_key:process.env.CLOUDE_API_KEY,
//     api_secret:process.env.CLOUDE_API_SECRET 
// })

// const uploadCloudinary = async(filePath)=>{
//     try {
//         if(!filePath)  return null;
//         const result = await cloudinary.uploader.upload(filePath,{
//             resource_type:'auto'
//         });

//         //delete local file
//         fs.unlinkSync(filePath);
//          return result.secure_url
//     } catch (error) {
//          console.log("Error while uploading to Cloudinary", error);
//     fs.unlinkSync(filePath);
//     return null;
//     }
// }

// export default uploadCloudinary;


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'; //  Use promise-based version
import dotenv from 'dotenv';
dotenv.config();

//  Cloudinary Config
cloudinary.config({
    cloud_name:process.env.CLOUDE_NAME,
    api_key:process.env.CLOUDE_API_KEY,
    api_secret:process.env.CLOUDE_API_SECRET 
})

// ✅ Helper: Safe file delete
const safeDelete = async (filePath) => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('❌ Error deleting file:', err.message);
    }
  }
};

// ✅ Main upload function
const uploadCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    await safeDelete(filePath);
    console.log('✅ Uploaded successfully to Cloudinary:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('🚨 Cloudinary Upload Failed:', error.message);
    await safeDelete(filePath);
    throw new Error('Cloudinary upload failed');
  }
};

export default uploadCloudinary;
