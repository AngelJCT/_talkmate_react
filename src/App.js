import { useState, useEffect, useRef, createContext } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { db } from "./firebase";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";

export const UserContext = createContext(null);

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationIndex, setActiveConversationIndex] = useState(null);
  const [user, setUser] = useState(null);

  const messageEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /*   useEffect(() => {
    const savedConversations = localStorage.getItem("conversations");
    const savedChatLog = localStorage.getItem("chatLog");

    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }

    if (savedChatLog) {
      setChatLog(JSON.parse(savedChatLog));
    }
  }, []); */
  const fetchConversations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "conversations"));
      const fetchedConversations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(fetchedConversations);
    } catch (error) {
      console.error("Error fetching conversations from Firestore:", error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  return (
    <UserContext.Provider value={user}>
      <div className="flex relative">
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
    </UserContext.Provider>
  );
}

export default App;
