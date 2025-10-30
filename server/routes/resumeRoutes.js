import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import {
  generateResume,
  getUserResumes,
  downloadResumePDF,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/generate", verifyToken, generateResume);
router.get("/my-resumes", verifyToken, getUserResumes);
router.get("/download/:id", verifyToken, downloadResumePDF);

export default router;
