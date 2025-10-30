import React from 'react'
import Header from '../commen/Header'
import Drawer from '../commen/Drawer'
import MobileNavigation from '../commen/MobileNavigation'

const Navigation = () => {

  return (
    <>
    
     <div className='fixed top-0 w-full'>
        {/* Header: Hidden on mobile, visible from 1024px (lg) and above */}
        <div className="hidden lg:block">
          <Header />
        </div>
        
        {/* Drawer: Visible on tablet, hidden from 1024px (lg) and above */}
        <div className="block lg:hidden">
          <Drawer />
        </div>

    {/* mobile : Visible on mobile, hidden from 640 (sm) and above */}
        <div className="block sm:hidden">
         <MobileNavigation/>
        </div>
     
      </div>
    
    </>
  )
}

export default Navigation