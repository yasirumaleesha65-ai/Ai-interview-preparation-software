// src/pages/resume/ResumeBuilder.jsx
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    experience: "",
    skills: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResumeText("");

    try {
      const res = await api.post("/resume/generate", formData);
      if (res.data.success) {
        setResumeText(res.data.resume);
        alert("Resume generated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMyResumes = () => navigate("/resume/my-resumes");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          AI Resume Builder
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Desired Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Work Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="3"
              placeholder="E.g., 3 years as a Frontend Developer at XYZ..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="E.g., React, Node.js, Communication..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="2"
              placeholder="E.g., BSc in Computer Science - University of Colombo"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </button>

            <button
              type="button"
              onClick={handleMyResumes}
              className="text-indigo-600 underline font-medium"
            >
              View My Resumes →
            </button>
          </div>
        </form>

        {/* Generated Resume */}
        {resumeText && (
          <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Generated Resume
            </h2>
            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {resumeText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
