import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// import resumeRoutes from "./routes/resumeRoutes.js";
// import coverLetterRoutes from "./routes/coverLetterRoutes.js";
// import interviewRoutes from "./routes/interviewRoutes.js";
import connectToDataBase from "./dataBase/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use("/api/resume", resumeRoutes);
// app.use("/api/cover-letter", coverLetterRoutes);
// app.use("/api/interview", interviewRoutes);
app.use("/api/users", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);

connectToDataBase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
