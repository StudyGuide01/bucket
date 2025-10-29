import React, { useEffect, useState } from 'react';
import banner from '../../public/channels4_banner.jpg';
import { useDispatch, useSelector } from 'react-redux';
import useGetOwnerChannel from '../hooks/useGetAllChannel';
import { useNavigate, useParams } from 'react-router-dom';
import { PiDribbbleLogoFill } from "react-icons/pi";
import ShowChannelDescription from '../components/channel/ShowChannelDescription';
import { setCurrentChannel } from '../redux/channelSlice';

const ChannelScreen = () => {
        useGetOwnerChannel(true);
        const {id} = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [showDetails,setShowDetails] = useState(false);
        const [activeTab, setActiveTab] = useState("Home");
        const {channels} = useSelector((store)=>store.channel);
        const currentChannel = channels.find((channel)=>channel._id === id);  
      const tabs = ["Home", "Videos", "Courses", "PlayList", "Posts"];
    console.log("id this is channel id",id);
      const handleNavigate = ()=>{
//  onClick={() => navigate('/create-content')}
 navigate('/create-content');
 localStorage.setItem('channelId',JSON.stringify(currentChannel?._id));

      }



  return (
<>
<div className='py-2 px-5 flex flex-col space-y-5'>
    <div className='text-red-300'>
        <img src={currentChannel?.banner} alt="banner" className='h-[210px] w-full object-cover object-top rounded-xl' />
    </div>

    {/* info */}
  <div className='flex justify-between'>
      <div className='flex flex-col sm:flex-row gap-7'>
       <div>
  {currentChannel?.avatar ? (
    <img
      src={currentChannel.avatar}
      alt="avatar"
      className="h-40 w-40 object-cover object-top rounded-full"
    />
  ) : (
    <PiDribbbleLogoFill className="text-gray-400 h-40 w-40 rounded-full bg-gray-800 p-4" />
  )}
</div>


        <div className='flex flex-col space-y-2'>
            <h1 className='text-white font-bold capitalize text-2xl'>{currentChannel?.channelName}</h1>
            <div className='text-white flex items-center  gap-4'>
                <span>@{currentChannel?.handle} </span>
                <span>subscriber </span>
                <span>Vidoe length </span>
            </div>
            <div className='text-white flex '>
                <p className='text-[#A7A7A7]'> {currentChannel?.description?.split(" ").slice(0, 10).join(" ")} </p>
                 <button
    onClick={() => setShowDetails((prev) => !prev)}
    className="text-blue-400 hover:underline"
  >
    ...More
  </button>

  {showDetails && <ShowChannelDescription setShowDetails={setShowDetails} currentChannel={currentChannel} />}
            </div>
            <button className='bg-white text-black font-semibold tracking-[5px]
 capitalize py-2 px-5 rounded-xl'>Subscriber</button>
        </div>
    </div>
    <div className='flex flex-col gap-3'>
        <button className='text-white bg-blue-500 font-bold capitalize rounded-lg px-5 py-2' >Customize</button>
        <button className='text-white bg-blue-500 font-bold capitalize rounded-lg px-5 py-2' onClick={handleNavigate}>Create </button>
    </div>
  </div>


    {/* video post playlist */}
<div>
    <div className='border-b border-b-gray-500 pb-'>
        <ul className='text-white flex space-x-4'>
           {tabs.map((tab) => (
        <li
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            text-lg cursor-pointer transition-all duration-200
            hover:text-blue-400 hover:underline hover:underline-offset-8
            ${activeTab === tab ? "text-blue-400 underline underline-offset-8" : ""}
          `}
        >
          {tab}
        </li>
      ))}
        </ul>
    </div>
</div>
</div>

</>
  )
}

export default ChannelScreen