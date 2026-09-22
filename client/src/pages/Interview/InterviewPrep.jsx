import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function InterviewPrep() {
  const [jobRole, setJobRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});

  const startInterview = async () => {
    if (!jobRole) return alert("Please enter a job role");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/interview/generate",
        { jobRole, experienceLevel },
        { withCredentials: true },
      );
      if (res.data.success) {
        setSession(res.data.session);
        setAnswers({});
        setEvaluations({});
      }
    } catch (error) {
      console.error(error);
      alert("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async (question, answer) => {
    if (!answer.trim()) return alert("Please enter an answer");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/interview/evaluate",
        {
          sessionId: session._id,
          question,
          answer,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        setEvaluations((prev) => ({
          ...prev,
          [question]: res.data.response.feedback,
        }));
      }
    } catch (error) {
      console.error(error);
      alert("Error evaluating answer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
          AI Interview Practice
        </h1>

        {/* Input Form */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="border rounded-lg p-3"
          />
          <input
            type="text"
            placeholder="Experience (e.g., Junior, Mid, Senior)"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="border rounded-lg p-3"
          />
          <button
            onClick={startInterview}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition"
          >
            {loading ? "Generating..." : "Start Interview "}
          </button>
        </div>

        {/* Questions Section */}
        {session && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Questions for {session.jobRole}
            </h2>

            <div className="space-y-8">
              {session.questions.map((question, idx) => (
                <div
                  key={idx}
                  className="p-5 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="font-medium mb-3">
                    <span className="font-bold text-indigo-600">
                      Question {idx + 1}:
                    </span>{" "}
                    {question}
                  </p>

                  <textarea
                    className="w-full border p-3 rounded-lg mb-3"
                    placeholder="Write your answer..."
                    value={answers[question] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question]: e.target.value,
                      }))
                    }
                  />

                  <button
                    onClick={() =>
                      evaluateAnswer(question, answers[question] || "")
                    }
                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Evaluate Answer
                  </button>

                  {evaluations[question] && (
                    <div className="mt-4 bg-white border-l-4 border-green-500 p-4 rounded-lg">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {evaluations[question]}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
