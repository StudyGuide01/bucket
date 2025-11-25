import React from 'react'
import VideoDescription from './VideoDescription'

const VideoBody = () => {
  return (
    <>
      {/* TITLE WITH LIKE SECTION */}
      <div className="mt-4 px-2 md:px-0">
        {/* Title */}
        <h1 className="text-xl font-semibold text-white mb-3">
          Video Title
        </h1>

        {/* Profile + Sub + Like Row */}
        <div className="flex justify-between items-center flex-wrap gap-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            {/* Profile */}
            <p className="w-14 h-14 bg-red-500 rounded-full"></p>

            {/* Channel Info */}
            <div className="leading-5">
              <p className="font-semibold text-white">Channel Name</p>
              <p className="text-gray-300 text-sm">2K subscriber</p>
            </div>

            {/* Subscribe Button */}
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-300">
              Subscriber
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 text-white">

            {/* Like Dislike */}
            <div className="flex items-center gap-2 bg-[#272727] py-2 px-3 rounded-full cursor-pointer">
              <button>likeIcon 1m</button>
              <span className="text-gray-500">|</span>
              <button>dilikeIcon</button>
            </div>

            {/* Share */}
            <button className="bg-[#272727] py-2 px-4 rounded-full hover:bg-[#3a3a3a]">
              Shere
            </button>

            {/* Download */}
            <button className="bg-[#272727] py-2 px-4 rounded-full hover:bg-[#3a3a3a]">
              Donwload
            </button>

          </div>
        </div>
      </div>

      {/* Description Section */}
      <VideoDescription/>

      {/* COMMENTS SECTION */}
      {/* <div className="mt-5 text-white px-2 md:px-0">

        <div className="flex items-center gap-4 mb-3">
          <p className="text-gray-300">filter</p>
        </div>

        <div className="mt-3 space-y-6">

          <div className="flex items-start gap-3 mt-10">
            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
            <div>
              <p className="font-semibold">User Name</p>
              <p className="text-gray-300 text-sm">kon comment karta he kon kis ko reply deta he</p>
            </div>
          </div>

          <div className="ml-14">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div>
                <p className="font-semibold">Reply User</p>
                <p className="text-gray-400 text-sm">kon kis ko reply deta he</p>
              </div>
            </div>
          </div>

        </div>
      </div> */}

    </>
  )
}

export default VideoBody
