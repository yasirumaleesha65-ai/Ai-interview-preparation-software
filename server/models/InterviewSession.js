import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobRole: { type: String, required: true },
    experienceLevel: { type: String, default: "Intermediate" },
    questions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const InterviewSession = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);
