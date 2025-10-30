import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaFileAlt, FaRobot, FaClipboardList, FaUserTie } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Resume Builder",
      description: "Generate a professional, ATS-optimized resume instantly.",
      icon: <FaFileAlt className="text-indigo-600 text-4xl" />,
      path: "/resume/builder",
    },
    {
      title: "Interview Practice AI",
      description: "Prepare for interviews with AI-powered mock questions.",
      icon: <FaRobot className="text-green-600 text-4xl" />,
      path: "/interview/start",
    },
    {
      title: "My Resumes",
      description: "View, download, or manage all your generated resumes.",
      icon: <FaClipboardList className="text-yellow-600 text-4xl" />,
      path: "/resume/my-resumes",
    },
    {
      title: "My Interviews",
      description: "Review your past AI interviews and performance feedback.",
      icon: <FaUserTie className="text-pink-600 text-4xl" />,
      path: "/interview/my-interviews",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || "Career Explorer"} 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Let’s boost your career journey with AI!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.path)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border hover:border-indigo-500 transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4 mb-4">
              {feature.icon}
              <h2 className="text-2xl font-semibold text-gray-800">
                {feature.title}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        Career Copilot © {new Date().getFullYear()} • Powered by AI ✨
      </div>
    </div>
  );
}
