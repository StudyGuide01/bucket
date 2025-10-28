import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    channelName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        default:''
    },
    category:{
        type:String,
        trim:true,
        default:''
    },
    banner:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:''
    },
    subscribers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vidoe'
    }],
     shorts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shorts'
    }],
     playList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Playlist'
    }],
    communityPost:[{
           type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]


},{timestamps:true});

const ChannelModel = mongoose.model('Channel',channelSchema);
export default ChannelModel;