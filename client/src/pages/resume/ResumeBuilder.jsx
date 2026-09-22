// src/pages/cover-letter/CoverLetterBuilder.jsx

import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CoverLetterBuilder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    companyName: "",
    position: "",
    jobDescription: "",
    experience: "",
    skills: "",
    education: "",
    achievements: "",
    motivation: "",
    tone: "Professional",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setCoverLetter("");

    try {
      const res = await api.post("/cover-letter/generate", formData);

      if (res.data.success) {
        setCoverLetter(res.data.coverLetter);
        alert("Cover letter generated successfully!");
      }
    } catch (err) {
      console.error("Error generating cover letter:", err);
      alert("Error generating cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMyCoverLetters = () => {
    navigate("/cover-letter/my-cover-letters");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            AI Cover Letter Generator
          </h1>

          <p className="text-gray-500 mt-2">
            Create a personalized cover letter tailored to the job you're
            applying for.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-1">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Current / Desired Job Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-1">Company Name</label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="ABC Technologies"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Position Applying For
                </label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Software Engineer Intern"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block font-medium mb-1">Job Description</label>

              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="6"
                required
                placeholder="Paste the job description here..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Background */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Background
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-medium mb-1">
                  Work Experience
                </label>

                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your relevant work or internship experience..."
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
                  placeholder="React, JavaScript, Node.js, Communication..."
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Education</label>

                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows="3"
                  placeholder="BSc in Information Technology - University of Colombo"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Key Achievements
                </label>

                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Projects, awards, certifications, achievements..."
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block font-medium mb-1">
              Why do you want this job?
            </label>

            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows="4"
              placeholder="Explain why you're interested in this position and company..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block font-medium mb-1">Cover Letter Tone</label>

            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Confident">Confident</option>
              <option value="Formal">Formal</option>
              <option value="Enthusiastic">Enthusiastic</option>
            </select>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block font-medium mb-1">
              Additional Information
            </label>

            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Anything else you'd like the AI to mention..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : " Generate Cover Letter"}
            </button>

            <button
              type="button"
              onClick={handleMyCoverLetters}
              className="text-indigo-600 underline font-medium"
            >
              View My Cover Letters →
            </button>
          </div>
        </form>

        {/* Generated Cover Letter */}
        {coverLetter && (
          <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Generated Cover Letter
              </h2>
            </div>

            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {coverLetter}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
