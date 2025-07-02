//individual chat button
import { useNavigate } from "react-router-dom";
import React from "react";

type Props = {
  recipientId: any;
};

const IndividualChatButton: React.FC<Props> = ({ recipientId }) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${recipientId}`)
  };

  return (
    <button
      onClick={handleChat}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Message
    </button>
  );
};

export default IndividualChatButton;
