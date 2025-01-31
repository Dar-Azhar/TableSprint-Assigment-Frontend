import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import login from "../assets/images/login.png";
import logo from "../assets/images/logo.png";
import { registerUser } from "../api/FetchApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationData = {
      name,
      email,
      password,
    };

    try {
      const response = await registerUser(registrationData);
      if (response.error) {
        console.error("Registration failed:", response.error);
        alert("Registration failed. Please try again.");
      } else {
        alert("Registration successful! Please login.");
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 bg-white shadow-lg rounded-md px-8 py-4 w-full max-w-md">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="logo" className="w-52" />
          <p className="text-gray-500">Create Your TableSprint Account</p>
        </div>

        <form
          className="mt-8 gap-5 flex flex-col items-end"
          onSubmit={handleRegister}
          method="POST"
        >
          <div className="mb-4 w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          <button
            type="submit"
            className="mt-3 w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-purple-700 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
