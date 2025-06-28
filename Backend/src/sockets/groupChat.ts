import { io } from "../server";
import { Socket, Server} from "socket.io";
import { saveMessages } from "../models/messageModels";

export const handleGroupChat = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("Socket server connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket server disconnected:", socket.id);
        });

        socket.on("join_unit_room", (unitName: string) => {
            socket.join(unitName);
            console.log(`${socket.id} joined ${unitName}`);
        })

        socket.on("unit_message", async({ unitName, sender, message }) => {
            try{
                //save mssage
                await saveMessages(unitName, sender, message);
                io.to(unitName).emit("unit_message", { sender, message });
            }
            catch(err){
                console.log(err);
            }
        })
    });
}