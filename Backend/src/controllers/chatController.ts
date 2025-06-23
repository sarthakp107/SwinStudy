import { Request, Response } from "express";

export const getAllChats = async(req: Request, res : Response) => {

    await res.send("Chat controller good");
}
export const getChatId = async(req: Request, res : Response) => {
    const id = req.params.id;
    await res.send(id);
}


