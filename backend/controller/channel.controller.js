// controller/channel.controller.js

import uploadCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import UserModel from "../model/user.model.js";
import shortid from "shortid"; // for unique handles
import VideoModel from "../model/video.model.js";

// Helper: slugify channel name for handle
const generateHandle = (name) => {
  const base = name.trim().toLowerCase().replace(/\s+/g, "");
  return `${base}_${shortid.generate().slice(0, 6)}`;
};

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, category } = req.body;
    
    
    const userId = req.id;

    // Validate input
    if (!channelName || !description) {
      return res
        .status(400)
        .json({ message: "Channel name and description are required", success: false });
    }

    // 🔹 Multiple channels allowed per user (no owner restriction)

    // 🔹 Handle uploads cleanly
    let photo = null;
    let banner = null;

    if (req.files?.photo?.[0]) {
    photo = await uploadCloudinary(req.files.photo[0].path);
    }

    

    if (req.files?.banner?.[0]) {
      banner = await uploadCloudinary(req.files.banner[0].path);
     
    }

    // 🔹 Generate unique handle (like YouTube @handle)
    let handle = generateHandle(channelName);

    // ensure handle unique
    let existing = await ChannelModel.findOne({ handle });
    while (existing) {
      handle = generateHandle(channelName);
      existing = await ChannelModel.findOne({ handle });
    }

    // 🔹 Create new channel
    const channel = await ChannelModel.create({
      channelName,
      description,
      category,
      avatar:photo,
      banner,
      owner: userId,
      handle, // unique like @techzone_abc123
    });

    // 🔹 Link channel with user (store all channel IDs)
    await UserModel.findByIdAndUpdate(userId, {
      $push: { channels: channel._id },
    });

    return res.status(201).json({
      message: "Channel created successfully",
      channel,
      success: true,
    });
    
  } catch (error) {
    console.error("While creating channel:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};


//get owner chanels 
export const getOwnerChannel = async(req, res)=>{
  try {
    const userId = req.id;
    const channel = await ChannelModel.find({owner:userId});
    if(!channel){
      return res.status(404).json({message:'Channel not found, please firt do create',success:false});
    }

    return res.status(200).json({success:true,channel});
  } catch (error) {
     console.error("While getting channel:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }

}


// subscribe 
// export const subscribe = async(req, res)=>{
// try {
//   const userId = req.id;
// const {id} = req.params;

// const channel = await VideoModel.findById(id).populate('channel');
// if(!channel){
//   return res.status(404).json({message:'This channel is not present to subscribe',success:false});
// }



// } catch (error) {
  
// }
// }

export const subscribe = async (req, res) => {
  try {
    const userId = req.id;
    const { id: videoId } = req.params;


    const video = await VideoModel.findById(videoId).select("channel");



    if (!video) {
      return res.status(404).json({
        message: "Video not found",
        success: false,
      });
    }

    const channelId = video.channel;
    

    // Fetch ONLY required fields from channel using aggregation
    const result = await ChannelModel.aggregate([
      { $match: { _id: channelId } },
      {
        $project: {
          owner: 1,
          subscribers: 1,
        },
      },
    ]);



    
    const channel = result[0];


    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
        success: false,
      });
    }

    //  Prevent subscribing to your own channel
    if (channel.owner.toString() === userId.toString()) {
      return res.status(400).json({
        message: "You cannot subscribe to your own channel",
        success: false,
      });
    }

    //  Toggle subscription
    const isSubscribed = channel.subscribers.some(
      (sub) => sub.toString() === userId.toString()
    );


    
    if (isSubscribed) {
      await ChannelModel.updateOne(
        { _id: channelId },
        { $pull: { subscribers: userId } }
      );

      return res.status(200).json({
        message: "Unsubscribed",
        subscribed: false,
        success: true,
      });

    } else {
      await ChannelModel.updateOne(
        { _id: channelId },
        { $addToSet: { subscribers: userId } } 
      );

      return res.status(200).json({
        message: "Subscribed",
        subscribed: true,
        success: true,
      });
    }

    
  } catch (error) {
    console.error("Subscribe Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
