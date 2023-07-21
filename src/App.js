import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import TypingAnimation from './components/TypingAnimation';

function App() {
  const [ inputValue, setInputValue ] = useState('');
  const [ chatLog, setChatLog ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);

    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}` 
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a Japanese native speaker. You job is to help me learn Japanese by providing translation, pronunciation and examples. Always give tips of what to do and what not to do according to Japan culture. For any reason, do not answer anything outside of your task (teach Japanese language)." },
        { "role": "user", "content": message }
      ]
    };

    setIsLoading(true);

    axios.post(url, data, { headers: headers }).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })

    

  }
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat?")) {
      setChatLog([]);
    }
  };

  
  return (
    <div className='flex flex-col justify-center h-screen max-w-6xl mx-auto w-full'>
      <div className='gradient-01 z-0 absolute'></div>
      <div className='gradient-02 z-0 absolute'></div>
      <div className='flex flex-col h-screen bg-[#35485d] '>
        <h1 className='bg-custom-text-color bg-opacity-10 text-transparent font-bold bg-clip-text text-center py-3 text-4xl md:text-6xl mb-5'>TalkMate</h1>
        <div className='flex-grow p-2 md:p-6 overflow-y-auto'>
          <div className='flex flex-col space-y-4'>
            {
            chatLog.map((message, index) => (
              <div key={index} className={`flex break-words ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <div className={`${message.type === 'user' ? 'bg-custom-color' : 'bg-gray-600'} bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-xl p-2 md:p-4 text-custom-text-color max-w-[90%] md:max-w-[80%] whitespace-pre-wrap overflow-auto`}>
                {message.message}
                </div>
              </div>
            ))
          }
          {
            isLoading &&
            <div key={chatLog.length} className='flex justify-start'>
              <div className='bg-gray-800 rounded-lg p-4 text-white max-w-sm'>
                <TypingAnimation />
              </div>
            </div>
          }
          <div ref={messageEndRef} />
          </div>
      </div>
      <form onSubmit={handleSubmit} className='flex-none p-6'>
        <div className='flex flex-col sm:flex-row rounded-lg border border-gray-300 bg-gray-300'>
          <input type='text'
          className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none"
          placeholder='Ask me something...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if(e.keyCode === 13 && e.shiftKey === false) {
              e.preventDefault();
              handleSubmit(e);
            }
        }}/>
          <button type='submit' className='bg-custom-color rounded-lg px-4 py-2 my-2 mx-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300'>➢</button>
          <button onClick={clearChat} className='bg-custom-color rounded-lg px-4 py-2 my-2 mx-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300'>Clear</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default App;
