import React from "react";

interface Chat {
  id: string;
  name: string;
}

interface ChatListProps {
  chats: Chat[];
  onSelect: (chat: Chat) => void;
  onAddChat: () => void;
  onRenameChat: (chatId: string, newName: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelect,
  onAddChat,
  onRenameChat,
}) => {
  const handleRename = (chatId: string) => {
    const newName = prompt("Inserisci un nuovo nome per la chat:");
    if (newName && newName.trim() !== "") {
      onRenameChat(chatId, newName.trim());
    }
  };

  return (
    <div className="chat-list">
      <h2>Chat List</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className="chat-item">
            <span onClick={() => onSelect(chat)} className="chat-name">
              {chat.name}
            </span>
            <button
              onClick={() => handleRename(chat.id)}
              className="rename-button"
            >
              ✏️
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onAddChat} className="add-chat-button">
        + Add Chat
      </button>
    </div>
  );
};

export default ChatList;
