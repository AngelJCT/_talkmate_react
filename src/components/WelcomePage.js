import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "./TypingAnimation"; // Import your loading animation component

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoading(true);
      // Simulate loading time or check auth state, then navigate
      setTimeout(() => {
        navigate("/chat");
      }, 2000); // Adjust time as needed
    }
  }, [navigate]);

  const handleGetStartedClick = () => {
    navigate("/auth", { state: { initialLoginMode: false } });
  };

  const handleLoginClick = () => {
    navigate("/auth", { state: { initialLoginMode: true } });
  };

  if (isLoading) {
    return <TypingAnimation />; // Replace with your actual loading animation component
  }

  return (
    <div className="welcome-page">
      <div className="flex flex-col">
        <div className="gradient-01 z-0 absolute md:w-[550px] sm:w-[400px] sm:h-[350px] sm:blur-[190px] lg:w-[800px] md:h-[350px] lg:h-[550px] md:blur-[200px] lg:blur-[270px] xs:blur-[120px]"></div>
        <div className="gradient-02 z-0 absolute md:w-[550px] sm:w-[400px] sm:h-[350px] sm:blur-[200px] lg:w-[700px] md:h-[350px] lg:h-[550px] md:blur-[250px] lg:blur-[300px] xs:blur-[130px]"></div>

        <div className="flex flex-col items-center justify-center h-screen bg-[#142f4df7] min-h-screen overflow-y-auto">
          <div className="circular-container mb-8 shadow-2xl drop-shadow-2xl xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
            <img
              src="/assets/images/result.jpg"
              alt="logo"
              className="w-full"
            />
          </div>
          <h1 className="header-text font-bold xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xs:mx-3 sm:mx-5 md:mx-10 lg:mx-14 mb-8 text-gray-100 z-20">
            Welcome to TalkMate!
          </h1>

          <div className="text-container text-center px-4 xs:mx-3 sm:mx-5 md:mx-10 lg:mx-14 max-w-4xl align-middle mb-8">
            <p className="font-medium xs:text-sm sm:text-xl md:text-2xl text-gray-100">
              Your new AI language learning assistant chatbot. TalkMate is your
              companion in mastering new languages. It provides translation,
              pronunciation, and cultural insights to help you not only learn
              the language but also understand the people and their culture.
              <br />
              <br />
              Ready to embark on your language learning journey?
            </p>
          </div>

          <button
            onClick={handleGetStartedClick}
            className="get-started-button shadow-xl backdrop-blur-md font-semibold"
          >
            Join me and let's chat!
          </button>

          <div className="login-shortcut text-center max-w-4xl mt-7">
            <p className="font-semibold xs:text-xs sm:text-xl md:text-2xl text-gray-100">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-bold underline shadow-xl drop-shadow-2xl"
                onClick={handleLoginClick}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
