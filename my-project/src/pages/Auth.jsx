import { useState } from "react";
import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12 flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <AuthForm isLogin={isLogin} />

          <div className="text-center mt-6">
            <p className="text-gray-600 text-lg">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-blue-600 hover:text-blue-800 font-medium ml-1 transition duration-200"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
