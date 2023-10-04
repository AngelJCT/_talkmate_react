import React from 'react';
import { slide as Menu } from 'react-burger-menu';

function Sidebar({ isOpen, onStateChange, setChatLog, conversations, setConversations, activeConversationIndex, setActiveConversationIndex }) {
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

  const deleteConversation = (indexToDelete) => {
    // Update state
    const updateConversations = conversations.filter((_, index) => index !== indexToDelete);
    setConversations(updateConversations);

    // Update local storage
    localStorage.setItem('conversations', JSON.stringify(updateConversations));

    // If e deleted the active conversation, clear the chat
    if (indexToDelete === activeConversationIndex) {
      setChatLog([]);
      setActiveConversationIndex(null);
    }
  }

  return (
    <Menu
      isOpen={isOpen} onStateChange={onStateChange}
      className='bg-gray-50 backdrop-blur bg-opacity-60 bg-clip-padding rounded-br-lg rounded-tr-lg'
      styles={{ bmMenu: { zIndex: 5 } }}
    >
      <button onClick={startNewChat} className='bg-custom-color font-medium text-xl w-full pt-5 pb-5 shadow-lg text-custom-text-color rounded-tr-lg'>
        New Chat
      </button>
      <h2 className='font-bold pt-5 text-xl bg-gray-200 bg-opacity-70 text-center mb-4 text-custom-blue pr-2 shadow-xl pb-5 rounded-b-xl'>Conversations</h2>
      {conversations.map((conversation, index) => (
        <div key={index} className='m-2 flex justify-between items-center position-relative'>
          <h3
            className={`font-medium text-custom-blue pl-3 cursor-pointer border-4 border-custom-blue border-opacity-20 hover:bg-gray-300 rounded-lg pb-2 pt-2 ${index === activeConversationIndex ? 'text-blue-700' : ''}`}
            onClick={() => loadConversation(index)}
          >
            {conversation.title}
          </h3>
        </div>
      ))}
    </Menu>
  );
}

export default Sidebar;
