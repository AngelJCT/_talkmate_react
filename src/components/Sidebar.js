import React, { useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { UserContext } from "./auth/AuthComponent";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

function SidebarComponent({
  isOpen,
  onStateChange,
  setChatLog,
  conversations,
  setConversations,
  activeConversationIndex,
  setActiveConversationIndex,
}) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userId");
    // Add any other session-related cleanup here
    navigate("/");
  };

  const fetchConversations = async () => {
    console.log("Current user:", user);
    if (user && user.uid) {
      try {
        const querySnapshot = await getDocs(collection(db, "conversations"));
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(fetchedConversations);
        console.log("fetchConversations called with user.uid:", user.uid);
      } catch (error) {
        console.error("Error fetching conversations from Firestore:", error);
      }
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      fetchConversations();
    }
  }, [user]);

  const loadConversation = (index) => {
    const selectedConversation = conversations[index];
    setChatLog(selectedConversation.messages);
    setActiveConversationIndex(index);
  };

  const startNewChat = () => {
    setChatLog([]);
    setActiveConversationIndex(null);
  };

  const deleteConversation = (indexToDelete) => {
    // Update state
    const updateConversations = conversations.filter(
      (_, index) => index !== indexToDelete
    );
    setConversations(updateConversations);

    // Update local storage
    localStorage.setItem("conversations", JSON.stringify(updateConversations));

    // If e deleted the active conversation, clear the chat
    if (indexToDelete === activeConversationIndex) {
      setChatLog([]);
      setActiveConversationIndex(null);
    }
  };

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={onStateChange}
      className="relative bg-gray-50 backdrop-blur bg-opacity-60 bg-clip-padding rounded-br-lg rounded-tr-lg"
      styles={{ bmMenu: { zIndex: 5 } }}
    >
      <button
        onClick={startNewChat}
        className="new-chat-button bg-custom-color font-medium text-xl w-full pt-5 pb-5 shadow-lg text-custom-text-color hover:bg-custom-blue/80"
      >
        New Chat
      </button>
      <h2 className="font-bold pt-5 text-xl bg-gray-200 bg-opacity-70 text-center mb-4 text-custom-blue pr-2 shadow-xl pb-5 rounded-b-xl">
        Conversations
      </h2>
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className="m-2 flex justify-between items-center position-relative"
        >
          <h3
            className={`font-medium text-custom-blue px-3 cursor-pointer border-4 border-custom-blue border-opacity-20 hover:bg-gray-300 rounded-lg pb-2 pt-2 ${
              index === activeConversationIndex ? "text-blue-700" : ""
            }`}
            onClick={() => loadConversation(index)}
          >
            {conversation.title}
          </h3>
        </div>
      ))}
      {/* to-do: add language selection feature starting with this button */}
      {/* <button className="bg-gray-200 bg-opacity-80 w-full cursor-pointer font-medium text-center text-custom-blue py-5 text-lg mt-5 absolute bottom-[68px] hover:bg-gray-300 items-center">
        Choose a language
      </button> */}

      <button
        className="logout-button bg-gray-200 bg-opacity-80 w-full cursor-pointer font-medium text-center text-custom-blue shadow-xl py-5 text-lg rounded-br-lg mt-5 underline underline-offset-[8px] hover:bg-gray-300"
        onClick={handleLogout}
      >
        Log out
      </button>
    </Menu>
  );
}

export default SidebarComponent;
