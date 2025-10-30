import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/common/FormContainer";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import FormError from "../../components/common/FormError";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signin",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Save user in context/localStorage if needed later
        navigate("/dashboard"); // or your main app page
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Welcome Back 👋" onSubmit={handleSubmit}>
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
      />

      <FormError message={error} />
      <SubmitButton label="Login" loading={loading} />

      <p className="text-gray-400 text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-cyan-400 hover:underline cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </FormContainer>
  );
}

export default Login;
