import React from "react";

const ShowChannelDescription = ({setShowDetails,currentChannel}) => {
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        
        {/* Modal Box */}
        <div className="bg-[#212121] w-[600px] p-6 rounded-xl shadow-2xl text-white space-y-6 relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-600 pb-2">
            <h2 className="text-xl font-semibold">{currentChannel?.channelName}</h2>
            <button
           onClick={()=>setShowDetails(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {currentChannel?.description}
            </p>
          </div>

          {/* More Info */}
          <div className="space-y-2 border-t border-gray-700 pt-3">
            <h3 className="text-lg font-medium">More Info</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><strong>Email:</strong> example@gmail.com</li>
              <li><strong>Website:</strong> www.example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowChannelDescription;
