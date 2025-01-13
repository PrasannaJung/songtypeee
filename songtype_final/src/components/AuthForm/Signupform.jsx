import React, { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../Api/Api";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    if (username.trim() === "") {
      setUsernameError("Please enter username");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("Please enter password");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = { username, email, password };
    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/login");
      }
    });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      // style={{
      //   backgroundImage:
      //     "url('https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      // }}
    >
      {/* Mountains - Using a dark overlay gradient */}
      {/* <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-transparent"></div> */}

      {/* Sign Up Form Container */}
      <div className="w-full max-w-md p-8 space-y-6 relative ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Create Account</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            {usernameError && (
              <p className="text-red-500 text-xs mt-1">{usernameError}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-gray-400">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-400 hover:text-blue-300">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
