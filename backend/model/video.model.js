import mongoose from  'mongoose';

//reply schema 
const replySchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{type:String,required:true}
},{timestamps:true,_id:true});

//comment schema
const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{type:String,required:true},
    replies:{replySchema}
},{timestamps:true,_id:true});


const videoSchema = new mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
     description:{
        type:String,
        trim:true
    },
     videoUrl:{
        type:String,
        trim:true,
        required:true
    },
     thumbnail:{
        type:String,
        trim:true,
        required:true
    },
    tags:[{type:String,trim:true}],
    views:{type:Number, default:0},
    like:[{ type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    disLike:[{ type:mongoose.Schema.Types.ObjectId,ref:'User',}],
    saveBy:[{ type:mongoose.Schema.Types.ObjectId,ref:'User',}],
   comments:{commentSchema}
},{timestamps:true});

const VideoModel = mongoose.model('Video',videoSchema);
export default VideoModel;