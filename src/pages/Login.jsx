import React, {  useState } from "react";
import login from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { loginUser } from "../api/FetchApi";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    try {
      const response = await loginUser(loginData);
      if (response.error) {
        console.error("Login failed:", response.error);
        alert("Login failed. Please try again.");
      } else {
        localStorage.setItem("authToken", response.token);
        window.location.href = "/dashboard";
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`relative min-h-screen bg-contain bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-5 right-5  left-4 xs:left-7 sm:top-[8rem] md:top-8 md:left-56 xl:left-80 xl:top-20 sm:left-36 bg-white shadow-lg rounded-md p-8 max-w-72  w-full  sm:max-w-[32rem] sm-plus:max-w-96 xs:max-w-80 md:max-w-96 ">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="logo" className="w-52" />
          <p className="text-gray-500">Welcome to TableSprint admin</p>
        </div>

        <form className="mt-8 gap-5 flex flex-col items-end" onSubmit={handleLogin} method="POST">
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <a href="/forgot-password" className="text-primary hover:underline">
            Forgot Password?
          </a>
          <button type="submit" className="mt-3 w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800">
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-700 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
