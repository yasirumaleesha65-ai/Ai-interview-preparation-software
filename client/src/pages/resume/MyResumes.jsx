// src/pages/resume/MyResumes.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all user resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resume/my-resumes");
        if (res.data.success) setResumes(res.data.resumes);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // ✅ Delete a resume
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await api.delete(`/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      alert("Resume deleted successfully!");
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume.");
    }
  };

  // ✅ Download as PDF
  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/resume/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading resume:", err);
      alert("Failed to download resume.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-600">Loading your resumes...</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          My Resumes 📄
        </h1>

        {resumes.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>No resumes found.</p>
            <a
              href="/resume/builder"
              className="text-indigo-600 underline mt-2 inline-block"
            >
              Create your first resume →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {resume.jobTitle || "Untitled Resume"}
                </h2>
                <p className="text-gray-500 mb-3">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDownload(resume._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Download PDF
                  </button>

                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
