import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCart from "./VideoCart";
import moment from 'moment';

const AllVideoPage = () => {
  const [allVideo, setAllVideo] = useState([]);
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/video/get-all-videos",
          { withCredentials: true }
        );
        if (response.data.success) {
          setAllVideo(response.data.video);
        }
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };
    getAllVideos();
  }, []);

  return (
    <>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 ">
    {
      allVideo?.map((video)=>{
        const relativeTime = moment(video.createdAt).fromNow();
        
        return(
           <VideoCart
            key={video._id} 
            id={video._id}
            title={video.title} 
            thumbnail={video.thumbnail} 
            avatar={video?.channel?.avatar}
            channelName={video?.channel?.channelName}
            views={video.views}
            uploadTime={relativeTime}
            />
        )
      })
    }
   
   </div>
    </>
  );
};

export default AllVideoPage;
