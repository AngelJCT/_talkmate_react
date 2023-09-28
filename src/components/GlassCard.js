import React from 'react';

function GlassCard({ hide }) {
  return (
    <div className={`flex flex-col justify-end xs:mt-4 md:mt-0 ${hide ? 'hide' : ''}`}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mx-4 md:mx-0'>
            <div className="backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-32 transition-transform duration-700 ease-in-out">
                <h2 className="text-xl mb-2 text-custom-blue font-medium">How can I tell someone</h2>
                <p className="text-gray-100">that I'm grateful for them in Japanese?</p>
            </div>
            <div className="backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-32 transition-transform duration-700 ease-in-out">
                <h2 className="text-xl mb-2 text-custom-blue font-medium">How can I introduce myself</h2>
                <p className="text-gray-100">in Japanese in different scenarios?</p>
            </div>
            <div className="backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-32 transition-transform duration-700 ease-in-out xs:hidden sm:hidden md:hidden lg:block">
                <h2 className="text-xl mb-2 text-custom-blue font-medium">What is the difference between</h2>
                <p className="text-gray-100">"Ore wa" and "Watashi wa" when referring to myself?</p>
            </div>
            <div className="backdrop-blur-md bg-gray-50 bg-opacity-30 bg-clip-padding border border-white border-opacity-20 p-4 rounded-xl shadow-xl w-full h-32 transition-transform duration-700 ease-in-out xs:hidden sm:hidden md:hidden lg:block">
                <h2 className="text-xl mb-2 text-custom-blue font-medium">Elaborate more about how to refers to someone</h2>
                <p className="text-gray-100">in respectfully and in casual occasions.</p>
            </div>
        </div>
    </div>
  );
}

export default GlassCard;