import { Socket, Server } from "socket.io";

export const handleIndivChat = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("join_private_room", (roomName: string) => {
            socket.join(roomName);
            console.log(`private: ${socket.id} joined room ${roomName}`);
        })
        try{
            
            socket.on("private_message", ({ roomName, sender, message }) => {
                io.to(roomName).emit("private_message", { sender, message });
                console.log("message emitted opn server")
            })
        }catch(err){
            console.log(err);
        }

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        })

    });
}