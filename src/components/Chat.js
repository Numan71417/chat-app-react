import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, [messagesRef, room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage.trim() === "") return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    } catch (error) {
      alert("Error adding message: ", error);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const messageDocRef = doc(db, "messages", messageId);
      await deleteDoc(messageDocRef);
    } catch (error) {
      alert("Error deleting message: ", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="header translucent-modal">
        <h4>Your Chat Code: {room.toUpperCase()}</h4>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message chat translucent-modal">
            <span className="user">{message.user}:</span>
            <br />
            <p>{message.text}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(message.id)}
            >
             <img src="https://img.icons8.com/plasticine/100/null/filled-trash.png"/>
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type message..."
        />
        <button type="submit" className="send-button">
          <img src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/null/external-send-social-media-prettycons-lineal-color-prettycons.png" />
        </button>
      </form>
    </div>
  );
};
