import React from 'react'

import useConversation from '../../zustand/useConversation';

const Conversation = ({convo, emoji}) => {

    const {selectedConversation , setSelectedConversation} = useConversation()

    const isSelected = selectedConversation?._id === convo._id;
    
  return (
    <>
    <div className={`flex gap-2 item-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer duration-150 ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(convo)}>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src={convo.profilePic} />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='text-center font-bold text-gray-200'>
                    {convo.fullName}
                </p>
                <span className='text-xl'>
                        {emoji}
                </span>
            </div>
        </div>
    </div>
    <div className='divider my-0 py-0 h-1'>
            
    </div>
    </>
  )
}

export default Conversation