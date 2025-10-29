// controller/channel.controller.js

import uploadCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import UserModel from "../model/user.model.js";
import shortid from "shortid"; // for unique handles

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
    const channel = await ChannelModel.findOne({owner:userId});
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