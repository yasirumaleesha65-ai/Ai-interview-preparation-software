import mongoose from "mongoose";

const interviewResponseSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    feedback: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

export const InterviewResponse = mongoose.model(
  "InterviewResponse",
  interviewResponseSchema
);
