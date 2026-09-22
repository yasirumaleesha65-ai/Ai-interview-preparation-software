import { GoogleGenerativeAI } from "@google/generative-ai";
import { InterviewSession } from "../models/InterviewSession.js";
import { InterviewResponse } from "../models/InterviewResponse.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 *  Start a new AI interview session
 */
export const startInterview = async (req, res) => {
  try {
    const { jobRole, experienceLevel } = req.body;
    const userId = req.user?._id;

    if (!jobRole) {
      return res
        .status(400)
        .json({ success: false, message: "Job role required" });
    }

    //  Generate 5 interview questions using Gemini
    const prompt = `
    Generate 5 realistic ${
      experienceLevel || "intermediate"
    }-level interview questions 
    for a ${jobRole} position. Format them as a numbered list.
    `;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview",
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Split the questions from text output
    const questions = text
      .split(/\d+\.\s/)
      .filter((q) => q.trim() !== "")
      .map((q) => q.trim());

    //  Save to DB
    const session = await InterviewSession.create({
      userId,
      jobRole,
      experienceLevel,
      questions,
    });

    return res.status(201).json({
      success: true,
      message: "Interview session created",
      session,
    });
  } catch (error) {
    console.error("Error starting interview:", error);
    res.status(500).json({
      success: false,
      message: "Error starting interview",
    });
  }
};

/**
 *  Evaluate user's answer to a question
 */
export const evaluateAnswer = async (req, res) => {
  try {
    const { sessionId, question, answer } = req.body;
    if (!sessionId || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Missing fields (sessionId, question, answer required)",
      });
    }

    //  Generate AI feedback
    const prompt = `
    You are a technical interviewer. Evaluate the following answer.
    Question: "${question}"
    Candidate's Answer: "${answer}"
    
    Give constructive feedback, rate out of 10, and mention areas for improvement.
    Format:
    Feedback: ...
    Rating: ...
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const feedback = result.response.text();

    // Extract numeric rating if possible
    const ratingMatch = feedback.match(/(\d+(\.\d+)?)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

    //  Save response to DB
    const savedResponse = await InterviewResponse.create({
      sessionId,
      question,
      answer,
      feedback,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Answer evaluated successfully",
      response: savedResponse,
    });
  } catch (error) {
    console.error("Error evaluating answer:", error);
    res.status(500).json({
      success: false,
      message: "Error evaluating answer",
    });
  }
};

/**
 * Get all user interview sessions
 */
export const getUserInterviews = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.user._id }).sort(
      { createdAt: -1 },
    );
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching sessions" });
  }
};
