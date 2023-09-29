import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function GlassCard({ hide }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const Card = ({title, content}) => (
        <div className="backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-32 transition-transform duration-700 ease-in-out">
            <h2 className="text-xl mb-2 text-custom-blue font-bold">{title}</h2>
            <p className="text-gray-100 font-medium">{content}</p>
        </div>
      );

  return (
    <div className={`flex flex-col justify-end xs:mt-4 md:mt-0 ${hide ? 'hide' : ''}`}>
        <div className='md:hidden mx-5'>
            <Slider arrows={false} {...settings}>
                <Card title="How can I tell someone" content="that I'm grateful for them in Japanese?" />
                <Card title="How can I introduce myself" content="in Japanese in different scenarios?" />
                <Card title="What is the difference between" content='"Ore wa" and "Watashi wa" when referring to myself?' />
                <Card title="Elaborate more about how to refers to someone" content="in respectfully and in casual occasions." />
            </Slider>
        </div>
        <div className='hidden md:grid grid-cols-2 gap-6 place-items-center mx-4 md:mx-0'>
            <Card title="How can I tell someone" content="that I'm grateful for them in Japanese?" />
            <Card title="How can I introduce myself" content="in Japanese in different scenarios?" />
            <Card title="What is the difference between" content='"Ore wa" and "Watashi wa" when referring to myself?' />
            <Card title="Elaborate more about how to refers to someone" content="in respectfully and in casual occasions." />
        </div>
    </div>
  );
}

export default GlassCard;