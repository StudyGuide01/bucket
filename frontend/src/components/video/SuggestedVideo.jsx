import React from "react";

const SuggestedVideo = () => {
  const videos = Array(8).fill({
    title: "Dummy Suggested Video",
    views: "340K views",
    thumbnail: "https://via.placeholder.com/160x90",
    channel: "Channel Name",
  });

  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="flex gap-3 bg-[#1e1e1e] p-2 rounded-lg hover:bg-[#2a2a2a] transition"
        >
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="w-40 h-24 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-between">
            <h3 className="text-sm font-semibold">{video.title}</h3>
            <p className="text-xs text-gray-400">{video.channel}</p>
            <p className="text-xs text-gray-400">{video.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedVideo;
