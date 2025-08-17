import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ChatMessage = {
    sender: string;
    message: string;
    created_at: Date;
};

export const useUnitChat = (unitName: string, currentUser: string) => {
    const [chat, setChat] = useState<ChatMessage[]>([]);

    useEffect(() => {

        //to get prev chat
        const fetchChatHistory = async () => {
            try {
                const res = await fetch(`https://swinstudy.com/api/chat/getUnitMessage?unitName=${unitName}`);
                const data = await res.json();
                const formattedMessages = data.map((msg: ChatMessage) => ({
                    sender: msg.sender === currentUser ? "You" : msg.sender,
                    message: msg.message,
                    created_at: new Date(msg.created_at)
                }));
                setChat(formattedMessages);
            } catch (err) {
                console.error("Error fetching chat history:", err);
            }
        }
        
        fetchChatHistory();

        socket.emit("join_unit_room", unitName); //to join the unit room
        const handleMessage = ({ sender, message, created_at }: ChatMessage) => {
            setChat((prev) => [
                ...prev,
                { sender: sender === currentUser ? "You" : sender, message, created_at},
            ])
        };

        socket.on("unit_message", handleMessage);

        return () => {
            socket.off("unit_message", handleMessage);
        }
    }, [unitName, currentUser]);

    const sendMessage = (message: string) => {
        if (!message.trim()) return;

        socket.emit("unit_message", {
            unitName,
            sender: currentUser,
            message,
        });
    };

    return { chat, sendMessage };
}

