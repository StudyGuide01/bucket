import axios from "axios";
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import useGetOwnerChannel from "../../hooks/useGetAllChannel";
import { useLocation } from "react-router-dom";

const UploadVideoPage = () => {
  useGetOwnerChannel(true);
  const [videoUrl,setVideoUrl] = useState(null)
  const [thumbnail,setThumbnail] = useState(null);
  const {register, handleSubmit, formState:{errors},reset} = useForm();
  const [loading,setLoading] = useState('false');
const channelId = JSON.parse(localStorage.getItem('channelId'));
 
useEffect(() => {
  return () => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/create/upload-video') {
      console.log("Left UploadVideoPage, removing channelId");
      localStorage.removeItem("channelId");
    }
  };
}, []);


 
  const handleVideo = (e)=>{
    setVideoUrl(e.target.files[0]);
  }

  const handleThumbnail = (e)=>{
    setThumbnail(e.target.files[0]);
  }

  //handleForm
const onSubmit = async (data) => {
  const formData = new FormData();
  
  if (videoUrl) formData.append('videoUrl', videoUrl);
  if (thumbnail) formData.append('thumbnail', thumbnail);

  formData.append('title', data.title);
  formData.append('description', data.description);
  
  // If tags are a string (comma separated), you can send as is
  // If it's an array, do JSON.stringify
  // formData.append('tags', JSON.stringify(data.tags));
    formData.append('tags', data.tags);


  setLoading(true);

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/video/create-video/${channelId}`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    console.log('✅ Video uploaded successfully:', response.data);
    // Optionally reset form or redirect
    // reset(); 
  } catch (error) {
    console.error('❌ Error on frontend to upload video:', error);
  } finally {
    setLoading(false);
    

  }
};

  return (
    <>
      <div className="bg-globalBlack min-h-screen mt-16 flex flex-col items-center py-10 px-5 text-white">
        {/* Container */}
        <div className="bg-[#1f1f1f] w-full max-w-[700px] rounded-2xl shadow-lg p-8 space-y-8 border border-gray-800">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-center mb-4">
            Upload Your Video
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 1️⃣ Video File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Video
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-40 border-2 border-dashed border-gray-600 hover:border-blue-400 rounded-xl cursor-pointer justify-center items-center transition-all duration-200">
                  <span className="text-gray-400 text-sm">
                    Drag & drop or click to upload
                  </span>
                  <input onChange={handleVideo} type="file" accept="video/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* 2️⃣ Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Video Title
              </label>
              <input
                type="text"
                {...register('title',{required:'Title is required'})}
                placeholder="Enter video title"
                className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              />
              {errors.title && <p className="text-red-500 capitalize mt-1">{errors.title.message}</p>}
            </div>

            {/* 3️⃣ Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                rows="4"
                 {...register('description',{required:'description is required'})}
                placeholder="Write a short description..."
                className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
              ></textarea>
              {errors.description && <p className="text-red-500 capitalize mt-1">{errors.description.message}</p>}
            </div>

            {/* 4️⃣ Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Tags
              </label>
              <input
                type="text"
 {...register('tags',{required:'description is required'})}
                placeholder="e.g. tech, coding, tutorial"
                className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              />
              <p className="text-gray-500 text-xs mt-1">
                Separate tags with space
              </p>

              {errors.tags && <p className="text-red-500 capitalize mt-1">{errors.tags.message}</p>}
            </div>

            {/* 5️⃣ Thumbnail */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Upload Thumbnail
              </label>
              <div className="flex items-center justify-center w-full">
  <label className="flex flex-col w-full h-48 border-2 border-dashed border-gray-600 hover:border-blue-400 rounded-xl cursor-pointer justify-center items-center transition-all duration-200 relative overflow-hidden">
    
    {/* ✅ Show image preview if selected */}
    {thumbnail ? (
      <div className="relative w-full h-full">
        <img
          src={URL.createObjectURL(thumbnail)}
          alt="Thumbnail Preview"
          className="object-cover w-full h-full rounded-lg"
        />

        {/* ❌ Remove/Change button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-white text-sm bg-red-600 px-3 py-1 rounded-md">
            Change Thumbnail
          </span>
        </div>

        {/* Hidden input for new file selection */}
        <input
          onChange={handleThumbnail}
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    ) : (
      // 🖼️ Placeholder UI before selection
      <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
        <span className="text-sm">Choose image or drag & drop</span>
        <input
          onChange={handleThumbnail}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
    )}
  </label>
</div>

            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-md transition-all duration-200"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadVideoPage;
