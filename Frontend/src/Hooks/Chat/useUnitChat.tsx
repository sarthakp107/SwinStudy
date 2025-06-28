import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ChatMessage = {
    sender: string;
    message: string;
};

export const useUnitChat = (unitName: string, currentUser: string) => {
    const [chat, setChat] = useState<ChatMessage[]>([]);

    useEffect(() => {
        socket.emit("join_unit_room", unitName); //to join the unit room
        const handleMessage = ({ sender, message }: ChatMessage) => {
            setChat((prev) => [
                ...prev,
                { sender: sender === currentUser ? "You" : sender, message },
            ])
        };

        socket.on("unit_message", handleMessage);

        return () => {
            socket.off("unit_message", handleMessage);
        }
    }, [unitName, currentUser]);

    const sendMessage = (message: string) => {
        if (!message.trim()) return;
        console.log("sending messg");

        socket.emit("unit_message", {
            unitName,
            sender: currentUser,
            message,
        });
    };

    return { chat, sendMessage };
}

