import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  FaEnvelopeOpenText,
  FaRobot,
  FaClipboardList,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";
import api from "../../api/axios";

export default function Dashboard() {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const features = [
    {
      id: "cover-letter",
      title: "AI Cover Letter Generator",
      description:
        "Create personalized, professional cover letters tailored to the job you're applying for.",
      icon: <FaEnvelopeOpenText className="text-indigo-600 text-4xl" />,
      path: "/resume/builder",
    },
    {
      id: "interview",
      title: "Interview Practice AI",
      description:
        "Prepare for interviews with AI-powered mock questions and practice sessions.",
      icon: <FaRobot className="text-green-600 text-4xl" />,
      path: "/interview",
    },
    {
      id: "my-cover-letters",
      title: "My Cover Letters",
      description:
        "View and manage all your previously generated cover letters.",
      icon: <FaClipboardList className="text-yellow-600 text-4xl" />,
      path: "/resume/my-resumes",
    },
    {
      id: "my-interviews",
      title: "My Interviews",
      description:
        "Review your previous AI interview sessions and performance feedback.",
      icon: <FaUserTie className="text-pink-600 text-4xl" />,
      path: "/interview/my-interviews",
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.post("/users/logout");

      if (res.data.success) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">
              Career Copilot
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your AI-powered career assistant
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg group-hover:translate-x-1 transition-transform duration-200" />
            <span>Logout</span>
          </button>
        </header>

        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome, {user?.name || "Career Explorer"}
          </h1>

          <p className="text-gray-600 text-lg">
            What would you like to work on today?
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => navigate(feature.path)}
              className="text-left bg-white p-7 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50">
                  {feature.icon}
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-5 text-indigo-600 font-medium">
                Open tool →
              </div>
            </button>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-gray-500 text-sm border-t border-gray-200">
          Career Copilot © {new Date().getFullYear()} • Powered by AI
        </footer>
      </div>
    </div>
  );
}
