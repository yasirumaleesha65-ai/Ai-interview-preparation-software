import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      id: "cover-letter",
      title: "AI Cover Letter Generator",
      desc: "Create personalized, professional cover letters tailored to the job you're applying for.",
    },
    {
      id: "interview",
      title: "AI Interview Coach",
      desc: "Practice interview questions and receive AI-powered feedback to improve your answers.",
    },
    {
      id: "career",
      title: "Personalized Career Insights",
      desc: "Get AI-powered guidance to help you plan your career and improve your job search.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-5 max-w-7xl w-full mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Career Copilot
        </button>

        <nav className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 rounded-full font-semibold text-slate-900 transition"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 font-semibold mb-4">
            AI-POWERED CAREER PLATFORM
          </p>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Your <span className="text-cyan-400">AI Career Assistant</span>
          </h2>
        </motion.div>

        {/* Typewriter */}
        <div className="text-xl sm:text-2xl mt-6 text-gray-300 min-h-[36px]">
          <Typewriter
            options={{
              strings: [
                "Create personalized cover letters ",
                "Prepare for interviews with AI ",
                "Get personalized career guidance ",
                "Build confidence for your next opportunity ",
              ],
              autoStart: true,
              loop: true,
              delay: 40,
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-2xl mt-6 text-gray-400 text-lg leading-relaxed"
        >
          Career Copilot helps you prepare for your next career opportunity with
          AI-powered cover letters, interview practice, and personalized career
          insights.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 rounded-full font-semibold text-slate-900 transition shadow-lg shadow-cyan-500/20"
          >
            Start Your Career Journey
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3.5 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 rounded-full font-semibold transition"
          >
            Sign In
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="bg-slate-800/80 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-semibold mb-2">
              EVERYTHING YOU NEED
            </p>

            <h3 className="text-3xl sm:text-4xl font-bold">
              Your Career, <span className="text-cyan-400">Powered by AI</span>
            </h3>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Use AI-powered tools to prepare, improve, and move forward in your
              career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900 p-7 rounded-2xl shadow-lg border border-slate-700 hover:border-cyan-500/50 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
                  <span className="text-2xl">
                    {feature.id === "cover-letter" && ""}
                    {feature.id === "interview" && ""}
                    {feature.id === "career" && ""}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-cyan-400 mb-3">
                  {feature.title}
                </h4>

                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-slate-800">
        © {new Date().getFullYear()} Career Copilot. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
