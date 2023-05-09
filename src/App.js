import React, { useState} from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  const handleEnterChat = () => {
    if (!room.trim()) {
      toast.error("Please enter a code to join or create a chat.");
      return;
    }
    setIsInChat(true);
  };

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div style={{padding:'30px'}} className="room translucent">
          <p >
          <img alt="/" src="https://img.icons8.com/emoji/48/null/warning-emoji.png"/>
             Enter the same code as your friend to chat or <br /> <hr />
          Enter new code to create new chat and share the code to your friend</p>

        
          <label> Enter code to Join or create new Chat: </label>
          <div className="mid">

          <input 
          className="enter-chat"
          placeholder="Type Code.."
          onChange={(e) => setRoom(e.target.value)} />
          
          <button onClick={handleEnterChat}>Enter Chat</button>

          </div>
        </div>
      ) : (
        <Chat room={room} />
      )}

<ToastContainer />
    </AppWrapper>
  );
}

export default ChatApp;
