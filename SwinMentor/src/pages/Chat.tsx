import ChatBody from "@/components/Chat/ChatBody";
import ChatHeader from "@/components/Chat/ChatHeader";
import TypeMessage from "@/components/Chat/TypeMessage";
import React from "react";

const Chat:React.FC = ()=>{
    return (
        <>
        <div className="min-h-screen flex flex-col">
            <div className="bg-gray-400 p-4">
                <ChatHeader />
            </div>
            
            <div className="bg-red-300 p-4">
                <ChatBody />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-purple-300">
                <TypeMessage />
            </div>
            
        </div>

        </>
    )
};

export default Chat;