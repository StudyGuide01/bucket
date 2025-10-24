import React, { useState } from 'react'
import Sidebar from '../components/layouts/Sidebar'
import { Outlet } from 'react-router-dom'

const HomeWrapper = () => {
    const [open, setOpne] = useState(true);
    const [selectTab, setSelectTab] = useState('Home')
  return (
    <div className='flex bg-black min-h-screen pt-14'> 
      
      {/* Sidebar - Fixed left side */}
      <div className='hidden lg:block fixed left-0 top-14 h-[calc(100vh-3.5rem)] overflow-y-auto'>
        <Sidebar open={open} selectTab={selectTab} setSelectTab={setSelectTab}/>
      </div>

      {/* Main Content Area - Sidebar ke baad */}
      <div className='flex-1 lg:ml-[300px]'> 
        <Outlet /> {/* Yaha content change hoga */}
      </div>

    </div>
  )
}

export default HomeWrapper