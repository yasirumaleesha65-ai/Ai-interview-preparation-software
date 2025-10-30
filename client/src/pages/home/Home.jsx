import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Career Copilot 🚀
        </h1>
        <nav className="space-x-6 hidden sm:flex">
          <button
            onClick={() => navigate("/login")}
            className="hover:text-cyan-400"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-full font-semibold text-slate-900"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold leading-tight"
        >
          Your <span className="text-cyan-400">AI Career Assistant</span>
        </motion.h2>

        <div className="text-xl sm:text-2xl mt-4 text-gray-300">
          <Typewriter
            options={{
              strings: [
                "Build a perfect resume in seconds ✨",
                "Get AI-powered interview feedback 💬",
                "Plan your dream career with data 📊",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mt-6 text-gray-400"
        >
          Career Copilot helps you craft professional resumes, prepare for
          interviews, and plan your next move — powered by AI insights and
          personalized advice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-full font-semibold text-slate-900"
          >
            Create Your AI Resume
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 rounded-full font-semibold"
          >
            Sign In
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="bg-slate-800 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-cyan-400">Career Copilot</span>?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Resume Builder",
              desc: "Generate a professional, ATS-optimized resume in seconds.",
            },
            {
              title: "Smart Interview Coach",
              desc: "Practice interviews with AI-generated questions and feedback.",
            },
            {
              title: "Career Insights Dashboard",
              desc: "Track your progress and improve your job search strategy.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700"
            >
              <h4 className="text-xl font-semibold text-cyan-400 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
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
