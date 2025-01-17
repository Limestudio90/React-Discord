import React, { useState } from "react";

interface Chat {
  id: string;
  name: string;
  webhookUrl: string;
  avatarUrl: string;
  username: string;
}

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (message: string) => void;
  onUpdateChat: (updatedChat: Chat) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  onSendMessage,
  onUpdateChat,
}) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (
    field: keyof Chat,
    value: string
  ) => {
    onUpdateChat({ ...chat, [field]: value });
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-2xl font-bold mb-4">{chat.name}</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold">Webhook URL</label>
        <input
          type="text"
          value={chat.webhookUrl}
          onChange={(e) =>
            handleInputChange("webhookUrl", e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Username</label>
        <input
          type="text"
          value={chat.username}
          onChange={(e) =>
            handleInputChange("username", e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Avatar URL</label>
        <input
          type="text"
          value={chat.avatarUrl}
          onChange={(e) =>
            handleInputChange("avatarUrl", e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button
        onClick={handleSend}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
