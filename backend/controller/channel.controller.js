import ChannelModel from "../model/channel.model.js";
export const createChannel = async(req, res)=>{
    try {
        const {channelName, description,category} = req.body;
        let photo;
        let banner;
 const userId = req.id;
    const existsChannel = await ChannelModel.findOne({ owner: userId });
    if(!existsChannel){
        return res.status(409).json({message:'Owner channel is already exist',success:false})
    }

    const nameExists = await ChannelModel.findOne({channelName});
    console.log(nameExists)
        
     
    } catch (error) {
        console.log(error)
    }
}