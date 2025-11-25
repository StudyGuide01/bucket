import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCart from "./VideoCart";
import moment from 'moment';

const getDurations = async (url) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.crossOrigin = 'anonymous';
    video.src = url;
    video.load();

    const format = (n) => String(n).padStart(2, '0');

    video.onloadedmetadata = () => {
      const totalSecond = Math.floor(video.duration);
      const hour = Math.floor(totalSecond / 3600);
      const minute = Math.floor((totalSecond % 3600) / 60);
      const second = totalSecond % 60;

      if (hour > 0) {
        resolve(`${hour}:${format(minute)}:${format(second)}`);
      } else {
        resolve(`${minute}:${format(second)}`);
      }
    };

    video.onerror = (err) => {
      console.warn(" Metadata error for:", url, err);
      resolve("0:00");
    };
  });
};


const AllVideoPage = () => {
  const [allVideo, setAllVideo] = useState([]);
  const [duration,setDuration] = useState({});

  useEffect(()=>{
    const fetchDuration = async()=>{
      if(Array.isArray(allVideo) && allVideo.length > 0){
        const durations = {};
        for(const video of allVideo){
          const formated = await getDurations(video?.videoUrl);
          durations[video._id]= formated; 
        }

setDuration(durations);
      }
    }

    fetchDuration();
  },[allVideo]);

  

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
            duration={duration[video._id]  || '0:00'}
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
