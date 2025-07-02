import { Socket, Server} from "socket.io";

export const handleGroupChat = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("Socket server connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket server disconnected:", socket.id);
        });

        socket.on("join_unit_room", (unitName: string) => {
            socket.join(unitName);
        })

        socket.on("unit_message", async({ unitName, sender, message }) => {
            try{
                //save mssage
                io.to(unitName).emit("unit_message", { sender, message });
                const res = await fetch("https://swinstudy.com/api/chat/postMessage" , {
                    method: "POST",
                    headers: {
                        "content-type" : "application/json",
                    },
                    body: JSON.stringify({unitName: unitName , sender: sender , message: message})
                })
            }
            catch(err){
                console.log(err);
            }
        })
    });
}