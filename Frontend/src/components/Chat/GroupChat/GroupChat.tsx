import { useState, useEffect, useRef } from "react";
import { useUnitChat } from "@/Hooks/Chat/useUnitChat";

type GroupChatProps = {
  unitName: string;
  currentUser: string;
};

export const GroupChat = ({ unitName, currentUser }: GroupChatProps) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { chat, sendMessage } = useUnitChat(unitName, currentUser);

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/messages?unitName=${unitName}`);
      const data = await res.json();
      setMessage(data); 
    };

    fetchMessages();
  }, [unitName])


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
              className={`max-w-xs p-3 rounded-lg shadow-md ${msg.sender === "You"
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
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};
