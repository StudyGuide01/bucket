import axios from "axios";
import { useEffect, useRef, useState } from "react";

const PlayVideo = ({ id }) => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    const controller = new AbortController();

    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/video/play-video/${id}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );

        if (response.data.success) {
          setVideo(response.data.video);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error(err);
        }
      }
    };

    fetchVideo();

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <div className="bg-[#181818] rounded-xl overflow-hidden shadow-lg max-w-[1250px] mx-auto flex flex-col">
      
      {/* Video Player */}
      <div className="bg-gray-800 w-full h-[600px] flex items-center justify-center rounded-t-xl">
        <video
          src={video?.videoUrl}
          className="w-full h-full object-contain"
          autoPlay
          controls={false}
          muted
          ref={videoRef}
        />
        
      </div>

      {/* Video Info */}
      <div className="p-4 bg-[#202020] flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-white">
          {video?.title || "Dummy Video Title"}
        </h2>
        <p className="text-gray-400 text-sm">
          {video?.views || "1.2M"} views • 2 days ago
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">
            Subscribe
          </button>
          <div className="flex gap-4 text-gray-300">
            <button className="hover:text-white">👍 {video?.like || "12K"}</button>
            <button className="hover:text-white">👎 {video?.disLike || "1K"}</button>
            <button className="hover:text-white">💬 Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
