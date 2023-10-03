import React from 'react';
import Slider from 'react-slick';
import { useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sendMessage } from '../utils/utils';


function GlassCard({ hide, setChatLog, setIsLoading, chatLog }) {

    const [activeCard, setActiveCard] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const Card = ({title, content}) => {
        return (
            <div
                onClick={(e) => {
                    setActiveCard(title);
                    handleCardAnimation(e.currentTarget);
                    setTimeout(() => {
                        handleCardClick(`${title} ${content}`);
                    }, 1000);
                }}
                className={`card backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-28 transition-transform duration-700 ease-in-out cursor-pointer ${activeCard === title ? 'animate-custom-bounce' : ''}`}
            >
                <h2 className="text-xl text-custom-blue font-bold">{title}</h2>
                <p className="text-gray-100 font-medium">{content}</p>
            </div>
        )
    };

    const handleCardClick = (message) => {
        // Add the user's message (from the card) to the chat log
        const userMessage = {
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        };

        setChatLog((prevChatLog) => [...prevChatLog, userMessage]);

        // This will locally save the message, which will then be picked up by the sendMessage function
        localStorage.setItem('chatLog', JSON.stringify([...chatLog, userMessage]));

        // Use the sendMessage function to send the card's content
        sendMessage(message, setChatLog, setIsLoading, chatLog);
    }

    const handleCardAnimation = (cardElement) => {

        cardElement.classList.add('animate-custom-bounce')
        // After the duration of the bounce animation, reset the active card
        setTimeout(() => {
            cardElement.classList.remove('animate-custom-bounce');
            cardElement.style.animation = 'fadeOut 0.5s forwards';
        }, 1000); // Assuming the bounce animation lasts 1 second
    };
    

    return (
        <div className={`flex flex-col justify-end xs:mt-4 md:mt-0 ${hide ? 'hide' : ''}`}>
            <div className='md:hidden mx-4 shadow-xl'>
                <Slider arrows={false} {...settings}>
                    <Card title="How can I tell someone" content="that I'm grateful for them in Japanese?" />
                    <Card title="How can I introduce myself" content="in Japanese in different scenarios?" />
                    <Card title="What is the difference between" content='"Ore wa" and "Watashi wa" when referring to myself?' />
                    <Card title="Elaborate on how to refers to someone" content="in formal and casual occasions." />
                </Slider>
            </div>
            <div className='hidden md:grid grid-cols-2 gap-6 place-items-center mx-4 md:mx-0'>
                <Card title="How can I tell someone" content="that I'm grateful for them in Japanese?" />
                <Card title="How can I introduce myself" content="in Japanese in different scenarios?" />
                <Card title="What is the difference between" content='"Ore wa" and "Watashi wa" when referring to myself?' />
                <Card title="Elaborate on how to refers to someone" content="in formal and casual occasions." />
            </div>
        </div>
    );
}

export default GlassCard;