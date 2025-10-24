import { FaGoogle } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
const ProfileWindow = () => {
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
      <span className="text-[var(--text-primary-color)]">Create Channel</span>
    </div>
   </div>
  </div>

  {/* auth info */}
  <div className="border-b border-gray-500 ">
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
            <span className="text-[var(--text-primary-color)]">Log</span>
          </div>
       </div>

  </div>

</div>
</>

)
}

export default ProfileWindow