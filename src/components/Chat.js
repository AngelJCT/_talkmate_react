import { useRef, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { FiMenu, FiX, FiSave, FiSend, FiMic, FiMicOff } from 'react-icons/fi'
import { VscSend } from 'react-icons/vsc';
import TypingAnimation from './TypingAnimation';
import GlassCard from './GlassCard';
import SaveDialogBox from './SaveDialogBox';
import { handleSubmit, sendMessage, clearChat, saveConversation } from '../utils/utils';


function Chat({ inputValue, setInputValue, chatLog, setChatLog, isLoading, setIsLoading, isMenuOpen, setIsMenuOpen, conversations, setConversations, activeConversationIndex, setActiveConversationIndex }) {
  const messageEndRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  
  /* const speak = (message) => {
    if (!isSpeechEnabled) {
      window.speechSynthesis.cancel();
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.8;

    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.name === 'Daniel');
    window.speechSynthesis.speak(utterance);
  } */

  useEffect(() => {

    /* const lastMessage = chatLog[chatLog.length - 1];
    if (lastMessage && lastMessage.type !== 'user') {
      speak(lastMessage.message);
    } */

    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Auto-saving to localStorage
    localStorage.setItem('chatLog', JSON.stringify(chatLog));
  }, [chatLog]);

  const handleSave = (title) => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    const newConversation = [...savedConversations, { title, messages: chatLog }]
    try {
      localStorage.setItem('conversations', JSON.stringify(newConversation));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
    setConversations(newConversation); // Update the state after saving to local storage
    setIsDialogOpen(false); // close the dialog after saving
  }

  return (
    <div className='flex flex-col justify-center h-screen mx-auto w-full z-10'>
      <div className='gradient-01 z-0 absolute'></div>
      <div className='gradient-02 z-0 absolute'></div>
      <div className='flex flex-col h-screen bg-[#35485d]'>
        <div className='bg-gray-200 bg-opacity-90 p-2 shadow-xl rounded-bl-2xl rounded-br-2xl z-10 flex items-center justify-between mb-1'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='z-20 ml-3 bg-custom-color rounded-full p-[8px] shadow-xl'>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className='text-custom-blue font-bold text-center py-3 text-4xl md:text-6xl'>TalkMate</h1>
          <div className='w-8 mr-7'></div> {/* This is a spacer to balance the button on the left */}
        </div>
        <div className='flex-grow p-2 md:p-6 overflow-y-auto'>
          <div className='flex flex-col space-y-4'>
            {
              chatLog.length === 0 ? (
                <GlassCard
                  hide={chatLog.length > 0}
                  setChatLog={setChatLog}
                  setIsLoading={setIsLoading}
                  chatLog={chatLog}
                />
            ) : (
              chatLog.map((message, index) => (
                <div key={index} className={`flex break-words ${
                  message.type === 'user' ? 'justify-end animate-slideInFromRight' : 'justify-start animate-slideInFromLeft'}`
                  }>
                  <div className={`${message.type === 'user' ? 'bg-custom-color rounded-br-none rounded-bl-3xl rounded-tr-3xl rounded-tl-3xl' : 'bg-gray-600 rounded-bl-none rounded-tr-3xl rounded-tl-3xl rounded-br-3xl'} bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-xl p-5 md:p-5 text-custom-text-color max-w-[90%] md:max-w-[80%] whitespace-pre-wrap overflow-auto`}>
                  {message.message}
                    {/* <button
                      type="button"
                      className="speech-toggle-button" 
                      onClick={() => {
                        setIsSpeechEnabled(!isSpeechEnabled);
                        if (!isSpeechEnabled) {
                          window.speechSynthesis.cancel();
                        } else {
                          speak(message.message);
                        }
                      }}
                    >
                      {isSpeechEnabled ? <FiMicOff size={15} /> : <FiMic size={15} />}
                    </button> */}
                  </div>
                </div>
              ))
            )
          }
          {
            isLoading &&
            <div key={chatLog.length} className='flex justify-start animate-slideInFromLeft'>
              <div className='bg-white bg-opacity-20 backdrop-blur-lg max-w-sm rounded-bl-none rounded-tr-3xl rounded-tl-3xl rounded-br-3xl p-3 m-1 shadow-xl'>
                <TypingAnimation />
              </div>
            </div>
          }
          <div ref={messageEndRef} />
        </div>
      </div>
      <form onSubmit={(event) => handleSubmit(event, setInputValue, inputValue, setChatLog, sendMessage, setIsLoading, chatLog)} className='flex-none p-6'>
        <div className='flex flex-row sm:flex-row rounded-3xl border border-transparent bg-gray-200 bg-opacity-90 shadow-xl'>
          <TextareaAutosize
          className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none font-medium"
          placeholder='Ask me something...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if(e.keyCode === 13 && e.shiftKey === false) {
              e.preventDefault();
              handleSubmit(e, setInputValue, inputValue, setChatLog, sendMessage, setIsLoading, chatLog);
            }
        }} />
          <div className='flex-none flex items-end'>
            <button type='submit' className='bg-custom-color rounded-3xl px-4 py-2 my-2 ml-2 mr-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300'>
              <VscSend size={24} />
            </button>
            {/*<button onClick={clearChat} className='bg-custom-color rounded-3xl px-4 py-2 my-2 mr-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300'>🧹</button>*/}
            <button type='button' onClick={() => setIsDialogOpen(true)} className='bg-custom-color rounded-3xl px-4 py-2 my-2 mr-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300'>
              <FiSave size={24} />
            </button>
          </div>
        </div>
      </form>
    </div>
    <SaveDialogBox
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      onSave={handleSave}
    />
    </div>
  )
}

export default Chat;