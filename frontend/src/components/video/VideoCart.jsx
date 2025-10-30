import React from "react";

const VideoCard = () => {
  return (
    <div className="w-full max-w-[400px] cursor-pointer bg-transparent hover:bg-[#232323]/60 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out hover:rounded-xl rounded-lg overflow-hidden group p-2 mx-auto">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src="https://res.cloudinary.com/do7pydtrf/image/upload/v1761803108/cctyakvlgr4oixkwlbq6.webp"
          alt="Video Thumbnail"
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
          12:45
        </span>
      </div>

      {/* Video Info */}
      <div className="flex mt-3 px-2 pb-3 space-x-3">
        {/* Channel Avatar */}
        <img
          src="https://res.cloudinary.com/do7pydtrf/image/upload/v1761803108/cctyakvlgr4oixkwlbq6.webp"
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        {/* Text Content */}
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-white font-semibold leading-tight line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
            Exploring the Mountains - A Complete Travel Vlog Adventure
          </h3>
          <p className="text-gray-400 text-sm mt-1 hover:text-gray-300 transition-colors duration-200">
            Wanderlust Channel
          </p>
          <p className="text-gray-400 text-sm">120K views • 2 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
