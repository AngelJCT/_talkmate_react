import axios from 'axios';

export const handleSubmit = (event, setInputValue, inputValue, setChatLog, sendMessage, setIsLoading, chatLog) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

    sendMessage(inputValue, setChatLog, setIsLoading, chatLog);

    setInputValue('');
}

export const sendMessage = async (message, setChatLog, setIsLoading, chatLog) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}` 
    };

    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a Japanese native speaker. You job is to help me learn Japanese by providing translation, pronunciation and examples. Always give tips of what to do and what not to do according to Japan culture. For any reason, do not answer anything outside of your task (teach Japanese language), and always go the extra mile." },
            ...chatLog.map(msg => ({ role: msg.type === 'user' ? 'user' : 'assistant', content: msg.message })),  // map existing chat log to API format
            { "role": "user", "content": message }
        ]
    };

    setIsLoading(true);

    try {    
        const response = await axios.post(url, data, { headers: headers });
        const newMessage = {
            type: 'bot',
            message: response.data.choices[0].message.content,
            timestamp: new Date().toISOString()
        };
        setChatLog((prevChatLog) => [...prevChatLog, newMessage]);
        setIsLoading(false);
        localStorage.setItem('chatLog', JSON.stringify([...chatLog, newMessage]))
    } catch (error) {
        setIsLoading(false);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
    };
}

export const clearChat = (setChatLog) => {
    if (window.confirm("Are you sure you want to clear the chat?")) {
        setChatLog([]);
        localStorage.removeItem('chatLog');
    }
}

export const saveConversation = (setIsDialogOpen) => {
    setIsDialogOpen(true)
}
