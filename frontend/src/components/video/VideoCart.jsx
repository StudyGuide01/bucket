import React from "react";

const VideoCard = ({id, title,thumbnail,avatar,channelName}) => {
  return (
    <div className="w-full max-w-[580px] hover:max-w-[600px] hover:bg-[#182A2E] hover:p-2 hover:rounded-xl group flex flex-col gap-5 transform transition-all duration-500 ease-in-out hover:scale-[1.02] hover:-translate-y-2" >
        <div className="relative w-full" style={{position:'inherit'}}>
          <img src={thumbnail} alt="" className="h-[300px] w-full object-cover rounded-lg group-hover:rounded-none"/>
        <p className=" text-right -mt-[35px] mr-3">50:50:50</p>
        </div>
        <div className="flex gap-3">
          <div>
          <img src={avatar} alt="" className="size-14 rounded-full"/>
          </div>
          <div className="mt-1">
            <h1>{title}</h1>
            <p>{channelName}</p>
            <span>111 Views . 1 month</span>
          </div>
        </div>
      </div>
  );
};

export default VideoCard;
