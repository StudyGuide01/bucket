import mongoose from 'mongoose';
import uploadCloudinary from '../config/cloudinary.js';
import ChannelModel from '../model/channel.model.js'
import VideoModel from '../model/video.model.js';

export const uploadVideo = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: 'please do create channel first', success: false });
        }
        const tagsArray = typeof tags === 'string' ? tags.split(/\s+/) : tags;
        if (!req.files?.videoUrl) {
            return res.status(401).json({ message: 'Video is required, please check', success: false });
        }

        if (!req.files?.videoUrl) {
            return res.status(401).json({ message: 'Thumbnail is required, please check', success: false });
        }
        const channel = await ChannelModel.findOne({ _id: id });
        if (!channel) {
            return res.status(401).json({ message: 'Channel not exist, please first do create channel', success: false })
        }

 const [uploadVideo, thumbnail] = await Promise.all([
  uploadCloudinary(req.files.videoUrl[0].path),
  uploadCloudinary(req.files.thumbnail[0].path),
]);

const video = await VideoModel.create({
channel:channel._id,
title,
description,
videoUrl:uploadVideo,
thumbnail:thumbnail,
tags:tagsArray,
});

await ChannelModel.findByIdAndUpdate(channel._id,
    {$push:{videos:video._id}},
    {new:true}
)
     
return res.status(201).json({message:'Video Upload successfully',success:true, video});




    } catch (error) {
        console.log('Error while upload vidoe', error);
        return res.status(500).json({ message: 'Enternal server error', success: false });
    }
}

//get all Videos
export const getAllVideos = async(req, res)=>{
    try {
        const userId = req.id;
        const {id} = req.params;
        const video = await VideoModel.find().populate('channel').sort({ createdAt: -1 });
        if(!video){
            return res.status(404).json({message:'Videos not found',success:false});
        };
        return res.status(200).json({success:true, video});
    } catch (error) {
        console.log('Error get  vidoe', error);
        return res.status(500).json({ message: 'Enternal server error', success: false });
    }
}




export const getSingleVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    // Aggregation
    let video = await VideoModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
      {
        $lookup: {
          from: "channels",
          localField: "channel",
          foreignField: "_id",
          as: "channelDetails"
        }
      },
      { $unwind: "$channelDetails" },
      {
        $project: {
          _id: 1,
          videoUrl: 1,
          title: 1,
          description: 1,
          like: 1,
          disLike: 1,
          views: 1,
          channel: {
            channelName: "$channelDetails.channelName",
            banner: "$channelDetails.banner"
          }
        }
      }
    ]);

    // Agar video nahi mila
    if (!video.length) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Array ka first element hi actual video object
    video = video[0];

    // Response bhejna
    return res.status(200).json({
      success: true,
      video
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



// //get play video 
// export const playedVideo = async(req, res)=>{
//     try {
//         const userId = req.id;
//          const videoId = req.params.id;

//   // Validation check
//     if (!mongoose.Types.ObjectId.isValid(videoId)) {
//       return res.status(400).json({ message: "Invalid video ID" });
//     }

// //     const step1 = await VideoModel.aggregate([
// //   { $match: { _id: new mongoose.Types.ObjectId(videoId) } }
// // ]);
// // console.log("STEP 1 - Match Output:", step1);

// // const step2 = await VideoModel.aggregate([
// //   { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
// //   {
// //     $lookup: {
// //       from: "channels",
// //       localField: "channel",
// //       foreignField: "_id",
// //       as: "channelDetails"
// //     }
// //   }
// // ]);
// // console.log("STEP 2 - Lookup Output:", step2);


// const step5 = await VideoModel.aggregate([
//   { $match: { _id: new mongoose.Types.ObjectId(videoId) } },

//   // Join channels collection
//   {
//     $lookup: {
//       from: "channels",
//       localField: "channel",
//       foreignField: "_id",
//       as: "channelDetails"
//     }
//   },

//   // Convert array to object (ek hi channel expected)
//   { $unwind: "$channelDetails" },

//   // Select only required fields
//   {
//     $project: {
//       _id: 1,
//       videoUrl: 1,
//       title: 1,
//       description: 1,
//       like: 1,
//       disLike: 1,
//       views: 1,
//       channel: {                 // custom object create kar rahe
//         channelName: "$channelDetails.channelName",
//         banner: "$channelDetails.banner"
//       }
//     }
//   }
// ]);


// console.log('step to check response ',step5)




//     } catch (error) {
//         console.log('Error while get current video');
//     }
// }


// export const uploadVideo = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction(); //  ensure atomic DB write

//   try {
//     const { title, description, tags } = req.body;
//     const { id } = req.params;

//     // Validate channel ID
//     if (!id) {
//       return res.status(400).json({ message: 'Please create a channel first.', success: false });
//     }

//     //  Validate required fields
//     if (!req.files?.videoUrl || !req.files?.thumbnail) {
//       return res.status(400).json({ message: 'Video and thumbnail are required.', success: false });
//     }

//     //  Convert tags (if string)
//     const tagsArray = typeof tags === 'string' ? tags.split(/\s+/) : tags;

//     //  Validate channel existence
//     const channel = await ChannelModel.findById(id);
//     if (!channel) {
//       return res.status(404).json({ message: 'Channel not found.', success: false });
//     }

//     //  Upload video + thumbnail simultaneously
//     const [videoUrl, thumbnailUrl] = await Promise.all([
//       uploadCloudinary(req.files.videoUrl[0].path),
//       uploadCloudinary(req.files.thumbnail[0].path),
//     ]);

//     // Create video entry in DB (transaction session used)
//     const video = await VideoModel.create(
//       [
//         {
//           channel: channel._id,
//           title,
//           description,
//           videoUrl,
//           thumbnail: thumbnailUrl,
//           tags: tagsArray,
//         },
//       ],
//       { session }
//     );

//     //Update channel videos array
//     await ChannelModel.findByIdAndUpdate(
//       channel._id,
//       { $push: { videos: video[0]._id } },
//       { new: true, session }
//     );

//     //  Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     return res.status(201).json({
//       message: ' Video uploaded successfully!',
//       success: true,
//       video: video[0],
//     });
//   } catch (error) {
//     //  If something goes wrong → rollback
//     await session.abortTransaction();
//     session.endSession();

//     console.error('Error while uploading video:', error);
//     return res.status(500).json({
//       message: 'Internal server error during video upload.',
//       success: false,
//       error: error.message,
//     });
//   }
// };