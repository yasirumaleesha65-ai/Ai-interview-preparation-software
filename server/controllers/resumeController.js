import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { CoverLetter } from "../models/Resume.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Cover Letter
export const generateCoverLetter = async (req, res) => {
  try {
    const {
      name,
      jobTitle,
      companyName,
      position,
      jobDescription,
      experience,
      skills,
      education,
      achievements,
      motivation,
      tone,
      additionalInfo,
    } = req.body;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Validate important fields
    if (!name || !companyName || !position || !jobDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Name, company name, position, and job description are required",
      });
    }

    const prompt = `
You are a professional career coach and expert cover letter writer.

Create a personalized, professional cover letter for the candidate below.

CANDIDATE INFORMATION
Name: ${name}
Current/Desired Job Title: ${jobTitle}
Experience: ${experience || "Not provided"}
Skills: ${skills || "Not provided"}
Education: ${education || "Not provided"}
Achievements: ${achievements || "Not provided"}

JOB INFORMATION
Company: ${companyName}
Position: ${position}

JOB DESCRIPTION
${jobDescription}

CANDIDATE MOTIVATION
${motivation || "Not provided"}

TONE
${tone || "Professional"}

ADDITIONAL INFORMATION
${additionalInfo || "None"}

INSTRUCTIONS:

1. Write a personalized cover letter specifically for this position.
2. Clearly connect the candidate's skills and experience to the job description.
3. Do not invent experience, qualifications, achievements, or technologies.
4. Avoid generic statements whenever possible.
5. Keep the letter professional and natural.
6. Make it suitable for a real job application.
7. Keep it around 350-500 words.
8. Do not use excessive headings.
9. Do not include explanations before or after the cover letter.
10. Return only the finished cover letter.

Structure the letter with:

- Professional opening
- Why the candidate is interested in the position/company
- Relevant skills and experience
- Why the candidate would be a good fit
- Professional closing
`;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview",
    });

    const result = await model.generateContent(prompt);

    const coverLetterText = result.response.text();

    if (!coverLetterText) {
      return res.status(500).json({
        success: false,
        message: "Gemini did not return a cover letter",
      });
    }

    // Save to MongoDB
    const coverLetter = await CoverLetter.create({
      userId,
      name,
      jobTitle,
      companyName,
      position,
      jobDescription,
      experience,
      skills,
      education,
      achievements,
      motivation,
      tone,
      additionalInfo,
      coverLetter: coverLetterText,
    });

    return res.status(201).json({
      success: true,
      message: "Cover letter generated successfully!",
      coverLetter: coverLetterText,
      data: coverLetter,
    });
  } catch (error) {
    console.error("❌ Error generating cover letter:", error);

    return res.status(500).json({
      success: false,
      message: "Error generating cover letter",
    });
  }
};

// Get all cover letters for logged-in user
export const getUserCoverLetters = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const coverLetters = await CoverLetter.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      coverLetters,
    });
  } catch (error) {
    console.error("Error fetching cover letters:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching cover letters",
    });
  }
};
export const deleteCoverLetter = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const coverLetter = await CoverLetter.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!coverLetter) {
      return res.status(404).json({
        success: false,
        message: "Cover letter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cover letter deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cover letter:", error);

    res.status(500).json({
      success: false,
      message: "Error deleting cover letter",
    });
  }
};
