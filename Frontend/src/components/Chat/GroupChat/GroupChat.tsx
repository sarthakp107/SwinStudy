import { useState, useEffect, useRef } from "react";
import { socket } from "../../../socket"; // Make sure this exports an initialized socket.io-client instance

type ChatMessage = {
  sender: string;
  message: string;
};

type GroupChatProps = {
  unitName: string;
  currentUser: string; 
};

export const GroupChat = ({ unitName, currentUser }: GroupChatProps) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!unitName || !currentUser) return;

    socket.emit("join_unit", unitName); // join the unit's room

   socket.on("unit_message", ({ sender, message }: ChatMessage) => {
  setChat((prev) => [
    ...prev,
    { sender: sender === currentUser ? "You" : sender, message },
  ]);
});

    return () => {
      socket.off("unit_message");
    };
  }, [unitName, currentUser]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msg = {
      unitName,
      message,
      sender: currentUser,
    };

    socket.emit("unit_message", msg);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-xl p-4 bg-white shadow-md overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                msg.sender === "You"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-base break-words">{msg.message}</p>
              <p className="text-xs mt-1 text-right opacity-70">
                {msg.sender}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input area */}
      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};
