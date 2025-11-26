import React from 'react'

const VideoComment = () => {
  return (
    <>
    <div>
        <div className='flex items-center space-x-5'>
            <h1>100 Comment</h1>
            <p>Filter </p>
        </div>

        <div className='flex space-x-3 items-center'>
            <p>LOGO</p>
            <input type="text" className='w-full outline-none border-b border-gray-400 bg-transparent' />
        </div>

        <div className='flex space-x-5 mt-5'>
            <p className='w-10 h-10 bg-red-500 rounded-full'></p>
            <div>
                <h3>Channel handle </h3>
                <p>Comment by user</p>
                <div className='flex space-x-4'>
                    <p>like 2</p>
                    <p>dislike</p>
            <p className='w-10 h-10 bg-red-500 rounded-full'></p>
                    <p>Replay</p>
                </div>
            </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default VideoComment
