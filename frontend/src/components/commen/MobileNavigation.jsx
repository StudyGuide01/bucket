import { FaYoutube } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideoConference } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Drawer from "./Drawer";

const MobileNavigation = () => {
  return (
    <>
   <div>

     <div className='bg-globalBlack flex items-center justify-between py-2 px-4 flex-1 fixed top-0 w-full'>
        <div className="flex items-center justify-center space-x-5">
             <FaYoutube className="text-white text-5xl"/>
             <p className='text-white'>You Tube</p>
        </div>

        <div className="text-white"><IoSearchOutline className="text-3xl" /></div>
    </div>







<div className='bg-globalBlack flex items-center justify-around py-3 px-2 fixed bottom-0 left-0 right-0 w-full border-t border-gray-800'>
  
  {/* Home */}
  <div className="text-white flex flex-col items-center justify-center gap-1 min-w-[60px]">
    <IoHomeSharp className="text-2xl" /> 
    <span className="text-[10px] font-medium">Home</span>
  </div>

  {/* Shorts */}
  <div className="text-white flex flex-col items-center justify-center gap-1 min-w-[60px]">
    <SiYoutubeshorts className="text-2xl" /> 
    <span className="text-[10px] font-medium">Shorts</span>
  </div>

  {/* Add Button - Middle */}
  <div className="relative flex items-center justify-center min-w-[40px]">
    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center -mt-2 shadow-lg">
      <MdAdd className="text-black text-4xl" />
    </div>
  </div>

  {/* Subscriptions */}
  <div className="text-white flex flex-col items-center justify-center gap-1 min-w-[60px]">
    <PiVideoConference className="text-2xl" /> 
    <span className="text-[10px] font-medium">Subs</span>
  </div>

  {/* You */}
  <div className="text-white flex flex-col items-center justify-center gap-1 min-w-[60px]">
    <CgProfile className="text-2xl"/> 
    <span className="text-[10px] font-medium">You</span>
  </div>

</div>
   </div>
    
    
    
    </>
  )
}

export default MobileNavigation