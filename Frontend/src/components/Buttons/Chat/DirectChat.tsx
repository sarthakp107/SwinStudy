import { usePrivateChat } from "@/Hooks/Chat/usePrivateChat";
import { useState, useRef, useEffect } from "react";

type DirectChatProps = {
  roomName: string;
  currentUser: string;
  otherUser  : string;
};

const DirectChat = ({ roomName, currentUser, otherUser }: DirectChatProps) => {
  const [message, setMessage] = useState("");
 const {chat, sendMessage} = usePrivateChat(roomName, currentUser, otherUser);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
    console.log(message);
}

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView();
  }, [chat]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-md p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
         >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-[10px] mt-1 text-right opacity-60">{msg.sender}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
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

export default DirectChat;
