import React, { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

interface Chat {
  id: string;
  name: string;
  webhookUrl: string;
  avatarUrl: string;
  username: string;
}

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Carica le chat dal localStorage all'avvio
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  // Salva automaticamente le chat nel localStorage
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Aggiunge una nuova chat
  const addChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      webhookUrl: "",
      avatarUrl: "",
      username: "",
    };
    setChats([...chats, newChat]);
  };

  // Rinomina una chat specifica
  const renameChat = (chatId: string, newName: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, name: newName } : chat
      )
    );
  };

  // Aggiorna i dettagli di una chat
  const updateChat = (updatedChat: Chat) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === updatedChat.id ? updatedChat : chat
      )
    );
    setSelectedChat(updatedChat);
  };

  // Invia un messaggio tramite il webhook della chat selezionata
  const sendMessage = async (message: string) => {
    if (selectedChat) {
      const { webhookUrl, username, avatarUrl } = selectedChat;

      const payload = {
        username,
        avatar_url: avatarUrl,
        content: message,
      };

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Messaggio inviato con successo!");
        } else {
          console.error("Errore nell'invio del messaggio:", response.status);
        }
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <ChatList
        chats={chats}
        onSelect={setSelectedChat}
        onAddChat={addChat}
        onRenameChat={renameChat}
      />
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          onSendMessage={sendMessage}
          onUpdateChat={updateChat}
        />
      ) : (
        <div className="chat-placeholder">Seleziona una chat</div>
      )}
    </div>
  );
};

export default App;
