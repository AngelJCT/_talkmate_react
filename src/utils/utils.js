import axios from 'axios';

export const handleSubmit = (event, setInputValue, inputValue, setChatLog, sendMessage, setIsLoading) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

    sendMessage(inputValue, setChatLog, setIsLoading);

    setInputValue('');
}

export const sendMessage = (message, setChatLog, setIsLoading, chatLog) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}` 
    };

    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a Japanese native speaker. You job is to help me learn Japanese by providing translation, pronunciation and examples. Always give tips of what to do and what not to do according to Japan culture. For any reason, do not answer anything outside of your task (teach Japanese language), and always go the extra mile." },
            { "role": "user", "content": message }
        ]
    };

    setIsLoading(true);

    axios.post(url, data, { headers: headers }).then((response) => {
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }]);
        setIsLoading(false);
        localStorage.setItem('chatLog', JSON.stringify([...chatLog, { type: 'bot', message: response.data.choices[0].message.content }]))
    }).catch((error) => {
        setIsLoading(false);
        console.log(error);
    });
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
