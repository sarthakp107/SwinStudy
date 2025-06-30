import { io } from "socket.io-client";

export const socket = io("http://localhost:1313");

socket.on("connect", () => {
    console.log("Client side connection succesful");
})

socket.on("connect_error", (err) => {
    console.log(err);
})