import express from "express";
import { deleteUserSavedFlashcard, getSpecificSavedFlashcard, getUserFlashcardDeck, getUserGeneratedFlashcards, getUserLoggedInDates, getUserSavedFlashcard, postUserFlashcardDeck, postUserGeneratedFlashcards, postUserSavedFlashcard } from "../controllers/flashcardController";

const router = express.Router();

router.get("/getUserSavedFlashcard", getUserSavedFlashcard)
router.post("/postUserSavedFlashcard", postUserSavedFlashcard)
router.delete("/deleteUserSavedFlashcard", deleteUserSavedFlashcard) 
router.get("/getSpecificSavedFlashcard", getSpecificSavedFlashcard)
router.post("/postUserGeneratedFlashcards", postUserGeneratedFlashcards)
router.get("/getUserGeneratedFlashcards", getUserGeneratedFlashcards)
router.get("/getUserLoggedInDates", getUserLoggedInDates)
router.post("/postUserFlashcardDeck", postUserFlashcardDeck)
router.get("/getUserFlashcardDeck", getUserFlashcardDeck)

export default router;