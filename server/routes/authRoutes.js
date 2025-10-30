import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getMe);

export default router;
