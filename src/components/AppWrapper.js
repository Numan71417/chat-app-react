import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="app-header translucent-modal">
      <div className="flex-head">
        <h1> Chit Chat App</h1>
        {isAuth && (
        <div className="sign-out">
          <button 
          className="logout"
          onClick={signUserOut}> Log Out</button>
        </div>
      
      )}
      </div> 


      <div className="app-container">{children}</div>
     
      </div>

      
    </div>
  );
};
