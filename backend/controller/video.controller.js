import ChannelModel from '../model/channel.model.js'

export const uploadVideo = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const { id } = req.params;
        const tagsArray = typeof tags === 'string' ? tags.split(/\s+/) : tags;
        if (!req.files?.videoUrl) {
            return res.status(401).json({ message: 'Video is required, please check', success: false });
        }

         if (!req.files?.videoUrl) {
            return res.status(401).json({ message: 'Thumbnail is required, please check', success: false });
        }
const channel = await ChannelModel.findOne({_id:id});
if(!channel){
    return res.status(401).json({message:'Channel not exist, please first do create channel',success:false })
}





    } catch (error) {
        console.log('Error while upload vidoe', error);
        return res.status(500).json({ message: 'Enternal server error', success: false });
    }
}