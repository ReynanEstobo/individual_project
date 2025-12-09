import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUsers, saveLoggedInUser, removeLoggedInUser } from "../utils/LocalStorage.jsx";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [fade, setFade] = useState("opacity-0 translate-y-4");

  useEffect(() => {
    setTimeout(() => setFade("opacity-100 translate-y-0"), 50);
  }, [isLogin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------- LOGIN ----------------------------
  const handleLogin = () => {
    const users = getUsers();
    const existingUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!existingUser) {
      setError("Invalid email or password.");
      return;
    }

    // Save logged-in user
    saveLoggedInUser(existingUser);

    navigate("/profile");
  };

  // ---------------------------- SIGNUP ----------------------------
  const handleSignup = () => {
    const users = getUsers();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill out all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (users.some((u) => u.email === form.email)) {
      setError("Email already registered.");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "jobSeeker",
      bio: "",
      skills: "",
    };

    saveUsers([...users, newUser]);

    alert("Account created! Please log in.");
    setIsLogin(true);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // ---------------------------- FORM SUBMIT ----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) handleLogin();
    else handleSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className={`bg-white w-full max-w-md p-8 rounded-xl shadow-lg transform transition-all duration-300 ${fade}`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setFade("opacity-0 translate-y-4");
              setTimeout(() => setIsLogin(!isLogin), 200);
            }}
            className="text-blue-600 font-semibold cursor-pointer ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
