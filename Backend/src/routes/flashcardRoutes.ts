import express from "express";
import { deleteUserSavedFlashcard, getSpecificSavedFlashcard, getUserSavedFlashcard, postUserSavedFlashcard } from "../controllers/flashcardController";

const router = express.Router();

router.get("/getUserSavedFlashcard", getUserSavedFlashcard)
router.post("/postUserSavedFlashcard", postUserSavedFlashcard)
router.delete("/deleteUserSavedFlashcard", deleteUserSavedFlashcard) 
router.get("/getSpecificSavedFlashcard", getSpecificSavedFlashcard)

export default router;