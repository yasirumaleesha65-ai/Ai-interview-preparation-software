import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    achievements: {
      type: String,
      default: "",
    },

    motivation: {
      type: String,
      default: "",
    },

    tone: {
      type: String,
      default: "Professional",
    },

    additionalInfo: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
