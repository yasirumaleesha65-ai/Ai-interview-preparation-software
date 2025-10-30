import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { Resume } from "../models/Resume.js"; // ✅ import Resume model
dotenv.config();
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🎯 Generate and Save Resume
export const generateResume = async (req, res) => {
  try {
    const { name, experience, skills, education, jobTitle, summary } = req.body;
    const userId = req.user?._id; // ✅ from authentication middleware

    // 🧠 Build the AI prompt
    const prompt = `
      You are a professional career coach and resume writer.
      Create a polished, ATS-friendly resume for:
      - Name: ${name}
      - Desired Job Title: ${jobTitle}
      - Summary: ${summary || "Professional summary highlighting strengths."}
      - Experience: ${experience}
      - Skills: ${skills}
      - Education: ${education}

      Use clear section headings (Summary, Skills, Experience, Education).
      Output should be clean, professional, and markdown formatted.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResumeText = result.response.text();

    // 💾 Save to MongoDB
    const resume = await Resume.create({
      userId,
      fullName: name,
      email: req.user?.email || "N/A",
      phone: req.user?.phone || "N/A",
      summary,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim()),
      experience,
      education,
      aiEnhancedResume: aiResumeText,
    });

    res.status(201).json({
      success: true,
      message: "Resume generated and saved successfully!",
      resume,
    });
  } catch (error) {
    console.error("❌ Error generating resume:", error);
    res.status(500).json({
      success: false,
      message: "Error generating or saving resume",
    });
  }
};

// 📜 Get all resumes for logged-in user
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user resumes" });
  }
};

export const downloadResumePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const filePath = path.join("temp", `${resume.fullName}_Resume.pdf`);

    // Ensure temp folder exists
    if (!fs.existsSync("temp")) fs.mkdirSync("temp");

    // Write to a temporary file
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc
      .fontSize(20)
      .text(resume.fullName, { align: "center", underline: true });
    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .text(`${resume.email} | ${resume.phone}`, { align: "center" });
    doc.moveDown(1);

    // Summary
    if (resume.summary) {
      doc.fontSize(14).text("Summary", { underline: true });
      doc.fontSize(12).text(resume.summary);
      doc.moveDown();
    }

    // Skills
    if (resume.skills?.length) {
      doc.fontSize(14).text("Skills", { underline: true });
      doc.fontSize(12).text(resume.skills.join(", "));
      doc.moveDown();
    }

    // Experience
    if (resume.experience) {
      doc.fontSize(14).text("Experience", { underline: true });
      doc.fontSize(12).text(resume.experience);
      doc.moveDown();
    }

    // Education
    if (resume.education) {
      doc.fontSize(14).text("Education", { underline: true });
      doc.fontSize(12).text(resume.education);
      doc.moveDown();
    }

    // AI-enhanced text
    if (resume.aiEnhancedResume) {
      doc.addPage();
      doc.fontSize(14).text("AI-Enhanced Resume", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).text(resume.aiEnhancedResume);
    }

    // Finalize
    doc.end();

    // Wait until file is ready and then send it
    doc.on("finish", () => {
      res.download(filePath, `${resume.fullName}_Resume.pdf`, (err) => {
        if (err) console.error(err);
        fs.unlinkSync(filePath); // Cleanup after download
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({
      success: false,
      message: "Error generating resume PDF",
    });
  }
};
