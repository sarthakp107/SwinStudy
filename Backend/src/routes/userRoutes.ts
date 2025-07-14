import express from 'express';
import { createHash } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post("/create-public-id", createHash)

export default userRouter;