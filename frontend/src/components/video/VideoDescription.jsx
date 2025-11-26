import { useState } from "react";

const VideoDescription = () => {



  return (
    <>
     <div className={`bg-[#272727]  px-5 py-4 mt-5 rounded-xl text-white text-sm leading-6`}>

        <div className="flex gap-3 font-semibold">
          <span>33 views</span>
          <span>Upload Time</span>
        </div>

        <div className="mt-3 text-gray-200">
          <p className="font-semibold">STARTR CODE</p>
        </div>

        <div className="mt-3">
          Video Summery Description
        </div>

        <div className="mt-3 text-gray-300">
          Time Duratio of video
        </div>

        <div className="mt-3">
          Message Section
        </div>

        <div className="mt-3">
          Sociela Links
        </div>
      </div>
    </>
  );
};

export default VideoDescription;

