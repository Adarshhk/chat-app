import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import {getRandomEmoji} from '../../utils/emojis.js'

const Conversations = () => {

  const {loading , conversations } = useGetConversations();
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading ? <span className='loading loading-spinner mx-auto'></span> : conversations.map((convo)=> {
        return <Conversation convo = {convo} key={convo._id} emoji = {getRandomEmoji()}/>
      })}
    </div>
  )
}

export default Conversations