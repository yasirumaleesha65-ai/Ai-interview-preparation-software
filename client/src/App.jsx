import { useAppContext } from "./context/AppContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashBoard/DashBoard";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import MyResumes from "./pages/resume/MyResumes";
import InterviewPrep from "./pages/InterviewPrep";

function App() {
  const { user, loading } = useAppContext();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dash-board" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dash-board" />}
      />
      <Route
        path="/dash-board"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/resume/builder" element={<ResumeBuilder />} />
        <Route path="/resume/my-resumes" element={<MyResumes />} />
        <Route path="/interview" element={<InterviewPrep />} />
      </Route>
    </Routes>
  );
}

export default App;
