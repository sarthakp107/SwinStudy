import express from "express";
import { deleteUserSavedFlashcard, getSpecificSavedFlashcard, getUserGeneratedFlashcards, getUserSavedFlashcard, postUserGeneratedFlashcards, postUserSavedFlashcard } from "../controllers/flashcardController";

const router = express.Router();

router.get("/getUserSavedFlashcard", getUserSavedFlashcard)
router.post("/postUserSavedFlashcard", postUserSavedFlashcard)
router.delete("/deleteUserSavedFlashcard", deleteUserSavedFlashcard) 
router.get("/getSpecificSavedFlashcard", getSpecificSavedFlashcard)
router.post("/postUserGeneratedFlashcards", postUserGeneratedFlashcards)
router.get("/getUserGeneratedFlashcards", getUserGeneratedFlashcards)

export default router;