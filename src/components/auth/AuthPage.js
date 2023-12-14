import React from "react";
import { useNavigate } from "react-router-dom";
import AuthComponent from "./AuthComponent";
import transition from "../../transition";
import TransitionWrapper from "../TransitionWrapper";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/chat");
  };
  return (
    <div className="auth-page-wrapper">
      <div className="flex flex-col">
        <div className="gradient-01 z-0 absolute"></div>
        <div className="gradient-02 z-0 absolute"></div>
        <div className="flex flex-col items-center justify-center h-screen bg-[#35485db7]">
          <div className="xs:w-[85%] sm:w-[100%] auth-card shadow-2xl bg-gray-100 backdrop-blur-md">
            <AuthComponent onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
