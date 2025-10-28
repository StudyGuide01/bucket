import React from 'react'

const Home = () => {
  return (
    <div className='bg-black text-white min-h-screen p-6'>
      <h1 className='text-3xl font-bold mb-4'>Home Page</h1>
      <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Sample video cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className='bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition'>
            <div className='bg-gray-600 h-40 rounded-lg mb-3'></div>
            <h3 className='text-lg font-semibold'>Video Title {item}</h3>
            <p className='text-gray-400 text-sm'>Channel Name</p>
            <p className='text-gray-400 text-sm'>1M views • 2 days ago</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home