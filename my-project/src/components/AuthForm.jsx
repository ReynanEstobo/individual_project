import { useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { Eye, EyeOff } from "lucide-react"; // optional icon library

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // toggle state

  // Animate form switch
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, [isLogin]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setMessage("");

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setMessage(isLogin ? "Login successful!" : "Registration successful!");
        setFormData({ email: "", password: "", rememberMe: false });
      }, 1200);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      className={`max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden transition-all duration-300
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800 transition-all duration-300">
        {isLogin ? "Login" : "Create an Account"}
      </h2>

      {message && (
        <div
          className={`mb-6 p-3 rounded-lg text-center font-medium transition-all duration-300
            ${
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="transition-all duration-300">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition"
            />
            <span className="text-gray-700 text-sm">Remember me</span>
          </label>

          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="primary w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
