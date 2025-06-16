import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../Context/ChatContext'
import { AuthContext } from '../../Context/AuthContext'

const RightSidebar = () => {

  const {selectedUser, messages} = useContext(ChatContext)

  const {logout, onlineUsers} = useContext(AuthContext)

  const [messageImages, setMessageImages] = useState([]); // store all the images url send by the msg 

  useEffect(()=> {
    setMessageImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  },[messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>

        <div className='pt-16 flex flex-col items-center gap-2 text-sm font-light mx-auto'>
          <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" 
          className='w-20 aspect-[1/1] rounded-full'/>
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
            {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
            {selectedUser.fullName}
          </h1>
          <p className='px-12 mx-auto'>{selectedUser.bio}</p>
        </div>

        <hr className='border-[#ffffff50] my-4'/>

        <div className='px-5 text-xs'>
          <p>Media & Files</p>
          <div className='mt-2 max-h-[195px] overflow-y-scroll grid grid-cols-2 gap-3 opacity-90'>
            {messageImages.map((url, index)=> (
              <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
                <img src={url} alt="" className='h-[95%] rounded-md'/>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
          Logout
        </button>
    </div>
  )
}

export default RightSidebar