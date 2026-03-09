//testing cicd
import { io } from "socket.io-client";

export const socket = io("http://localhost:5001");

socket.on("connect", () => {
    console.log("Client side connection succesful");
})

socket.on("connect_error", (err) => {
    console.log(err);
})