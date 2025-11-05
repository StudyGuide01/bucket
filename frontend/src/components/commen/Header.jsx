import { IoMdMenu } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import ProfileWindow from "../layouts/ProfileWindow";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetOwnerChannel from "../../hooks/useGetAllChannel";
import { useSelector } from "react-redux";


const Header = () => {
  const naviage = useNavigate();
  const profileRef = useRef();
  const [profileWindowOpen,setProfileWindowOpen] = useState(false);
  const {channels} = useSelector(store=>store.channel);

  


 useEffect(()=>{
  const handleClickOutside = (e)=>{
    if(profileRef.current && !profileRef.current.contains(e.target)){
      setProfileWindowOpen(false);
    }
  }

  document.addEventListener('mousedown',handleClickOutside);
  return ()=>{
    document.addEventListener('mousedown',handleClickOutside)
  }
 },[]);

useGetOwnerChannel(profileWindowOpen);
  return (
<>
<header className="flex items-center justify-between px-4 bg-globalBlack py-1 relative">
 {/* left side */}
    <div>
        {/* logo */}
        <div className="flex items-center justify-center space-x-5">
            <IoMdMenu className="text-white text-2xl cursor-pointer"  onClick={()=>naviage('/')}/>
            <FaYoutube className="text-white text-5xl cursor-pointer"  onClick={()=>naviage('/')}/>
        </div>
    </div>


    {/* center side */}
    <div>
        {/* search box */}
        <div className="flex items-center justify-center   gap-4">
          <div className="flex items-center justify-center">
             <input type="text" placeholder="Search" className="w-full lg:w-[400px] border-none outline-none py-2 px-3 rounded-l-3xl border border-[hsl(0,0%,18.82%)]" />
             <div className="bg-[#222222] w-20 h-10  flex items-center justify-center rounded-r-3xl"><IoSearchOutline className="text-white text-3xl" /></div>

             
          </div>
          <div className="bg-[#222222] w-[54px] h-[54px] rounded-full flex items-center justify-center"><CiMicrophoneOn className="text-white text-3xl" /></div>
        </div>
    </div>


 {/* right side */}
    <div>
        {/* logo */}
        <div className="flex items-center justify-cente space-x-4">
            <div className="text-white flex items-center justify-center bg-[#222222] py-2 px-5 rounded-2xl gap-2"><FaPlus /> Create</div>
          {/* profile */}
          <div ref={profileRef}>
<FaRegUserCircle onClick={() => setProfileWindowOpen((prev)=>!prev)}   className="text-white w-8 h-8 cursor-pointer"/>

{
  profileWindowOpen && <div   className="">
  <ProfileWindow setProfileWindowOpen={setProfileWindowOpen} channels={channels} />
</div>
}
          </div>
        </div>
    </div>

</header>

</>
  )
}

export default Header

