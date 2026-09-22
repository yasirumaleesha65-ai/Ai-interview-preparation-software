// src/pages/interview/MyInterviews.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function MyInterviews() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get("/interview/my-interviews");

        if (res.data.success) {
          setSessions(res.data.sessions);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview session?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/interview/${id}`);

      setSessions((prev) => prev.filter((session) => session._id !== id));

      if (selectedSession?._id === id) {
        setSelectedSession(null);
      }

      alert("Interview session deleted successfully!");
    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("Failed to delete interview session.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading your interviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              My Interviews
            </h1>

            <p className="text-gray-500 mt-1">
              Review your previous AI interview practice sessions.
            </p>
          </div>

          <Link
            to="/interview"
            className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-center"
          >
            New Interview
          </Link>
        </div>

        {/* Empty State */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border p-10 text-center">
            <div className="text-5xl mb-4"></div>

            <h2 className="text-xl font-semibold text-gray-800">
              No interviews yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Start your first AI-powered interview practice session.
            </p>

            <Link
              to="/interview"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Start Interview →
            </Link>
          </div>
        ) : (
          /* Interview Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {session.jobRole}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {session.experienceLevel} Level
                    </p>
                  </div>

                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                    🎤
                  </div>
                </div>

                {/* Session Information */}
                <div className="space-y-2 text-sm text-gray-600 mb-5">
                  <p>
                    <span className="font-medium text-gray-700">
                      Questions:
                    </span>{" "}
                    {session.questions?.length || 0}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Created:</span>{" "}
                    {new Date(session.createdAt).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Time:</span>{" "}
                    {new Date(session.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Questions
                  </button>

                  <button
                    onClick={() => handleDelete(session._id)}
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

      {/* Questions Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedSession.jobRole}
                </h2>

                <p className="text-gray-500 mt-1">
                  {selectedSession.experienceLevel} Level
                </p>
              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="text-gray-500 hover:text-gray-800 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Questions */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-6">
                <p className="text-sm text-gray-500">Interview Date</p>

                <p className="font-semibold text-gray-800">
                  {new Date(selectedSession.createdAt).toLocaleString()}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Interview Questions
              </h3>

              {selectedSession.questions?.length > 0 ? (
                <div className="space-y-4">
                  {selectedSession.questions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                          {index + 1}
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          {question}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No questions were saved for this session.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
