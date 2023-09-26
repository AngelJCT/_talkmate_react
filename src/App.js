import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat';

function App() {
  const [ inputValue, setInputValue ] = useState('');
  const [ chatLog, setChatLog ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [ activeConversationIndex, setActiveConversationIndex ] = useState(null);

  const messageEndRef = useRef(null);

  useEffect(() => {
      const savedConversations = localStorage.getItem('conversations');
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    const savedChatLog = localStorage.getItem('chatLog');
    if (savedChatLog) {
      setChatLog(JSON.parse(savedChatLog));
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  }
  
  return (
    <div className='flex relative'>
      <Sidebar 
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        setChatLog={setChatLog}
        conversations={conversations}
        activeConversationIndex={activeConversationIndex}
        setActiveConversationIndex={setActiveConversationIndex}
      />

      <Chat
        inputValue={inputValue}
        setInputValue={setInputValue}
        chatLog={chatLog}
        setChatLog={setChatLog}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        conversations={conversations}
        setConversations={setConversations}
        activeConversationIndex={activeConversationIndex}
        setActiveConversationIndex={setActiveConversationIndex}
      />
    </div>
  )
}

export default App;
