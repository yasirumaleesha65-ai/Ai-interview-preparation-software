import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import {
  startInterview,
  evaluateAnswer,
  getUserInterviews,
} from "../controllers/interviewController.js";

const router = express.Router();

// Protected routes
router.post("/generate", verifyToken, startInterview);
router.post("/evaluate", verifyToken, evaluateAnswer);
router.get("/my-interviews", verifyToken, getUserInterviews);

export default router;
