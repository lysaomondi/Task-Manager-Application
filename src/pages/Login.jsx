import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, signup, user } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [isSignup, setIsSignup] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 to-pink-100 px-6">
      
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
        
        <h1 className="text-4xl font-bold text-slate-800 mb-6 text-center">
          {isSignup
            ? "Create Account"
            : "Login to TaskFlow"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
          >
            {isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() =>
              setIsSignup(!isSignup)
            }
            className="text-pink-500 font-semibold ml-2"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}