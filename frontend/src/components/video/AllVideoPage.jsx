import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCart from "./VideoCart";

const AllVideoPage = () => {
  const [allVideo, setAllVideo] = useState([]);
console.log(allVideo[0]);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {allVideo.map((video) => (
          <VideoCart key={video._id} />
        ))}
      </div>
    </>
  );
};

export default AllVideoPage;
