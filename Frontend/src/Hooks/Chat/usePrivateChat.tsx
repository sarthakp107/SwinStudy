import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ChatMessage = {
    sender: string;
    message: string;
    created_at: Date;
};

export const usePrivateChat = (roomName : string, currentUser: string , otherUser: string) => {
    const [chat, setChat] = useState<ChatMessage[]>([]);

        useEffect(() => {
            
            socket.emit("join_private_room", roomName);
            const handleMessage = ({ sender, message, created_at }: ChatMessage) => {
            setChat((prev) => [
                ...prev,
                { sender: sender === currentUser ? "You" : sender, message, created_at},
            ])
        }; 

        socket.on("private_message", handleMessage )
          return () => {
            socket.off("private_message", handleMessage);
        }

        }, [roomName, currentUser, otherUser]);

        const sendMessage = (message: string) => {
        if (!message.trim()) return;

        socket.emit("private_message", {
            roomName,
            sender: currentUser,
            receiver: otherUser,
            message,
        });
    };

    return {chat, sendMessage}
}