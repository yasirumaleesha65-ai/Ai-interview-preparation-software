import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/common/FormContainer";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import FormError from "../../components/common/FormError";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:3000/api/users/signup",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Create an Account" onSubmit={handleSubmit}>
      <FormInput
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
      />
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
      <SubmitButton label="Sign Up" loading={loading} />

      <p className="text-gray-400 text-center mt-4 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-cyan-400 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </FormContainer>
  );
}

export default Register;
