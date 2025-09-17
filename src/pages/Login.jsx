import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("token/", { username, password });
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-8 relative">
        {/* Tabs */}
        <div className="flex mb-6">
          <div className="flex-1 text-center py-2 font-semibold text-white bg-teal-700 rounded-l-2xl cursor-pointer">
            Log in
          </div>
          <div className="flex-1 text-center py-2 font-semibold text-gray-700 bg-gray-200 rounded-r-2xl cursor-pointer">
            Register
          </div>
        </div>

        {/* Form */}
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email id</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-red-500 mt-1 text-right cursor-pointer hover:underline">
              Forget Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800 transition"
          >
            Log In
          </button>
        </form>

        {/* Or Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full border border-gray-300 p-2 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
          <span className="mr-2">Continue with Google</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span className="text-red-500 font-semibold cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}