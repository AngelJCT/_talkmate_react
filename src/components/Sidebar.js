import React from 'react';
import { slide as Menu } from 'react-burger-menu';

function Sidebar({ isOpen, onStateChange, setChatLog, conversations, activeConversationIndex, setActiveConversationIndex }) {
  const loadConversation = (index) => {
    const selectedConversation = conversations[index];
    setChatLog(selectedConversation.messages);
    localStorage.setItem('chatLog', JSON.stringify(selectedConversation.messages));
    setActiveConversationIndex(index);
  }

  const startNewChat = () => {
    setChatLog([]);
    setActiveConversationIndex(null);
  }

  return (
    <Menu
      isOpen={isOpen} onStateChange={onStateChange}
      className='bg-gray-300'
      styles={{ bmMenu: { zIndex: 5 } }}
    >
      <button onClick={startNewChat} className='bg-custom-color font-medium text-xl w-full pt-5 pb-5 shadow-lg text-white'>
        New Chat
      </button>
      <h2 className='font-bold pt-5 text-xl text-center mb-4 text-custom-blue pr-2 shadow-xl pb-5 rounded-b-xl'>Conversations</h2>
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className='mb-3'
          onClick={() => loadConversation(index)}
        >
          <h3 className={`font-bold text-gray-600 ml-3 cursor-pointer ${index === activeConversationIndex ? 'text-blue-700' : ''}`}>{conversation.title}</h3>
        </div>
      ))}
    </Menu>
  );
}

export default Sidebar;
