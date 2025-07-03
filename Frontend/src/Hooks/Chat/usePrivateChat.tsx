import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ChatMessage = {
    sender_id: string;
    message: string;
    created_at: Date;
    isSelf? : boolean;
};

export const usePrivateChat = (roomName: string, currentUser: string, otherUser: string) => {
    const [chat, setChat] = useState<ChatMessage[]>([]);

    useEffect(() => {

        const fetchIndividualChatHistory = async () => {
            try {
                const res = await fetch(`https://swinstudy.com/api/chat/getIndividualMessage?user1=${currentUser}&user2=${otherUser}`);
                const data = await res.json();
                console.log("Fetched private messages:", data);

                const formattedMessage = data.map((msg: ChatMessage) => ({
                    sender: msg.sender_id,
                    message: msg.message,
                    created_at: new Date(msg.created_at),
                    isSelf : msg.sender_id === currentUser
                }))
                setChat(formattedMessage);
            } catch (err) {
                console.error("Error fetching private chat history:", err);
            }
        }
        fetchIndividualChatHistory();

        socket.emit("join_private_room", roomName);
        const handleMessage = ({ sender_id, message, created_at }: ChatMessage) => {
            setChat((prev) => [
                ...prev,
                { sender_id, message, created_at, isSelf: sender_id === currentUser},
            ])
        };

        socket.on("private_message", handleMessage)
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

    return { chat, sendMessage }
}