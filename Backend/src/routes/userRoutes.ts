import express from 'express';
import { createHash, test } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post("/create-public-id", createHash)
userRouter.get("/test", test);


export default userRouter;