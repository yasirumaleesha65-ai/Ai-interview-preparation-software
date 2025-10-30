import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    email: String,
    phone: String,
    summary: String,
    skills: [String],
    experience: String,
    education: String,
    aiEnhancedResume: String,
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
