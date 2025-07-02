import { Socket, Server } from "socket.io";

export const handleIndivChat = (io: Server) => {
    io.on("connection", (socket: Socket) => {

        console.log("indiv Socket server connected:", socket.id);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        })

        socket.on("join_private_room", (roomName: string) => {
            socket.join(roomName);

            console.log(`private: ${socket.id} joined room ${roomName}`);
        })

        socket.on("private_message", async ({ roomName, sender, receiver, message }) => {
            console.log("Received private_message event", { roomName, sender, receiver, message });
            try {
                io.to(roomName).emit("private_message", { sender, receiver, message });
                const res = await fetch("https://swinstudy.com/api/chat/postIndividualMessage", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ sender_id: sender, receiver_id: receiver, message: message })
                })
            } catch (err) {
                console.log(err);
            }
        })

    });
}