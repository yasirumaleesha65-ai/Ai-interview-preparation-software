import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import {
  generateCoverLetter,
  getUserCoverLetters,
  deleteCoverLetter,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/generate", verifyToken, generateCoverLetter);
router.get("/my-cover-letters", verifyToken, getUserCoverLetters);
router.delete("/:id", deleteCoverLetter);

export default router;
