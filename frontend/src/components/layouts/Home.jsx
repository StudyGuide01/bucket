import React from "react";
import AllVideoPage from "../video/AllVideoPage";

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>

      {/* AllVideoPage will handle the grid layout */}
      <AllVideoPage />
      
    </div>
  );
};

export default Home;
