import React from 'react'

const Shorts = () => {
  return (
    <div className='bg-black text-white min-h-screen p-6'>
      <h1 className='text-3xl font-bold mb-4'>Shorts</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {/* Sample shorts cards */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className='bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer'>
            <div className='bg-gray-600 h-80 flex items-center justify-center'>
              <span className='text-4xl'>▶️</span>
            </div>
            <div className='p-3'>
              <h3 className='text-sm font-semibold'>Short Video {item}</h3>
              <p className='text-gray-400 text-xs'>10M views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shorts