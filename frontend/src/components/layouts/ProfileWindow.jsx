import { FaGoogle } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const ProfileWindow = ({setProfileWindowOpen,channels}) => {
  const navigate = useNavigate();
  console.log('window profile',channels);
  return (
<>
{/* profile section */}
<div className="bg-[var(--bg-profile-color)] ">
   
  {/* prifle or name  */}
  <div className="border-b border-gray-500 ">
    <div className="flex gap-2  pb-3 py-4 px-4">
    <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"  className="rounded-full w-10 h-10" alt="" />
    <div className="flex flex-col space-y-1">
      <h2 className="text-[var(--text-primary-color)]">Name</h2>
      <p className="text-[var(--text-primary-color)]">Example@gmail.com</p>
     {/* create or view channel  */}
<div>
  {channels ? (
    <div className="relative inline-block group">
      {/* Trigger Button */}
      <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition">
        View Channels ▾
      </span>

      {/* Dropdown Menu */}
      <ul
        className="absolute left-1/2 -translate-x-1/2 top-8 min-w-[180px]
                   bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-all duration-300 ease-in-out transform
                   group-hover:translate-y-1 p-3 space-y-2 z-20"
      >
      {
        channels?.map((channel)=>{
          return(
              <li key={channel?._id} onClick={()=>navigate(`/channel-screen/${channel?._id}`)} className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
          {channel?.channelName}
        </li>
          )
        })
      }
       
       
      </ul>
    </div>
  ) : (
    <span
      onClick={() => navigate("/create-channel")}
      className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition"
    >
      Create Channel
    </span>
  )}
</div>



    </div>
   </div>
  </div>

  {/* auth info */}
  <div className="">
       <div className="flex flex-col space-y-4  pb-3 py-4 px-4">
          <div className="flex items-center space-x-5">
            <FaGoogle  className="text-[var(--text-primary-color)] text-2xl"/>
            <span className="text-[var(--text-primary-color)]">Google</span>
          </div>
          
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <MdSwitchAccount  className="text-[var(--text-primary-color)] text-2xl"/>
            <span className="text-[var(--text-primary-color)]">Switch Account</span>
            </div>
              <MdOutlineArrowForwardIos className="text-[var(--text-primary-color)]"/>
          </div>

          <div className="flex items-center space-x-5">
            <IoLogOut  className="text-[var(--text-primary-color)] text-2xl"/>
            <span className="text-[var(--text-primary-color)] cursor-pointer hover:text-blue-400" onClick={() => {navigate('/login');setProfileWindowOpen((prev) => !prev);}}
>Login</span>
          </div>
       </div>

  </div>

</div>
</>

)
}

export default ProfileWindow