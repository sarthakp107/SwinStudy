import { Request, Response } from "express";
import { createUserInApp } from "../User/UUIDhash";

export const createHash = async (req: Request, res: Response) => {
  const { uuid } = req.body;

  if (!uuid)  res.status(400).json({ error: "Missing UUID" });

  try {
    await createUserInApp(uuid); //feeds to db
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}