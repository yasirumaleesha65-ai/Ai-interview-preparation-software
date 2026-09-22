// src/pages/cover-letter/MyCoverLetters.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function MyCoverLetters() {
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const res = await api.get("/cover-letter/my-cover-letters");

        if (res.data.success) {
          setCoverLetters(res.data.coverLetters);
        }
      } catch (error) {
        console.error("Error fetching cover letters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetters();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cover letter?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/cover-letter/${id}`);

      setCoverLetters((prev) =>
        prev.filter((coverLetter) => coverLetter._id !== id),
      );

      if (selectedLetter?._id === id) {
        setSelectedLetter(null);
      }

      alert("Cover letter deleted successfully!");
    } catch (error) {
      console.error("Error deleting cover letter:", error);
      alert("Failed to delete cover letter.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading your cover letters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          My Cover Letters
        </h1>

        {coverLetters.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>No cover letters found.</p>

            <Link
              to="/cover-letter/builder"
              className="text-indigo-600 underline mt-2 inline-block"
            >
              Create your first cover letter →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coverLetters.map((coverLetter) => (
              <div
                key={coverLetter._id}
                className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {coverLetter.position || "Untitled Cover Letter"}
                </h2>

                <p className="text-gray-600 mb-1">
                  {coverLetter.companyName || "Company not specified"}
                </p>

                <p className="text-gray-500 mb-4">
                  Created:{" "}
                  {new Date(coverLetter.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedLetter(coverLetter)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(coverLetter._id)}
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

      {/* View Cover Letter Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedLetter.position}
                </h2>

                <p className="text-gray-500">{selectedLetter.companyName}</p>
              </div>

              <button
                onClick={() => setSelectedLetter(null)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Cover Letter Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-6">
                <p className="text-sm text-gray-500">Applicant</p>

                <p className="font-semibold text-gray-800">
                  {selectedLetter.name}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">Position</p>

                <p className="font-semibold text-gray-800">
                  {selectedLetter.position}
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-800 leading-7 whitespace-pre-wrap">
                  {selectedLetter.coverLetter}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setSelectedLetter(null)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>

              <button
                onClick={() => handleDelete(selectedLetter._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
