import { IoHome } from "react-icons/io5";
import { PiVideoConference } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { PiPlaylistFill } from "react-icons/pi";
import { MdWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const mainTab = [
    {icon:<IoHome />, tabName:'Home'},
    {icon:<SiYoutubeshorts />, tabName:"Shorts"},
    {icon:<PiVideoConference />, tabName:"Subscriptions"}
]

const youTab = [
    {icon:<FaHistory/>, tabName:'History'},
    {icon:<PiPlaylistFill  />, tabName:"Playlist"},
    {icon:<MdWatchLater />, tabName:"Watch Later"},
    {icon:<PiVideoConference />, tabName:"Like Videos"}

]

const Sidebar = ({open, selectTab, setSelectTab}) => {
  const navigate = useNavigate();
  return (
    <>
      <aside className="bg-globalBlack w-full  max-w-[250px] py-6 px-3 h-screen overflow-y-auto fixed left-0">

        {/* Main tab */}
        <div className="px-4 flex flex-col space-y-2 border-b border-gray-700 pb-4">
          {
            mainTab.map((item, index) => {
              return(
                <div 
                onClick={()=>{setSelectTab(item.tabName);navigate(`/${item.tabName}`)}}
                  key={index} 
                  className="flex items-center space-x-5 text-white hover:bg-gray-800 py-2 px-3 rounded-lg cursor-pointer transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-normal text-sm">{item.tabName}</p>
                </div>
              )
            })
          }
        </div>

        {/* You tab */}
        <div className="mt-4">
          <div className="flex items-center space-x-1 px-4 mb-2">
            <h3 className="text-white font-semibold text-base">You</h3> 
            <IoIosArrowForward className="text-white text-sm"/> 
          </div>
          
          <div className="px-4 flex flex-col space-y-2 border-b border-gray-700 pb-4">
            {
              youTab.map((item, index) => {
                return(
                  <div 
                    key={index} 
                    className="flex items-center space-x-5 text-white hover:bg-gray-800 py-2 px-3 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-normal text-sm">{item.tabName}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

      </aside>
    </>
  )
}

export default Sidebar