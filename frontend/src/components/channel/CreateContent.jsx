import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'

const CreateContent = () => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
 console.log('Location',location);
  

  const handleCreate = () => {
    if (!selectedType) return;
    navigate(`/create/${selectedType}`); // e.g. /create/upload-video
  };

  return (
    <div className="bg-globalBlack min-h-screen mt-16 flex flex-col items-center justify-center text-white">
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-10 tracking-wide">
        Create New Content
      </h1>

      {/* Buttons group */}
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { label: "Upload Video", value: "upload-video" },
          { label: "Upload Short", value: "upload-short" },
          { label: "Community Post", value: "community-post" },
          { label: "Playlist", value: "playlist" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setSelectedType(btn.value)}
            className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200 border
              ${
                selectedType === btn.value
                  ? "bg-blue-500 border-blue-500"
                  : "bg-[#1a1a1a] border-gray-700 hover:border-blue-400 hover:bg-[#222]"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Create button (appears after selection) */}
      {selectedType && (
        <div className="mt-10">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl font-semibold text-xl transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            Create
          </button>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Selected: <span className="text-blue-400">{selectedType}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateContent;
