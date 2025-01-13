// import { useState } from "react";
// import useLogin from "../../hooks/useLogin";
// import useSignup from "../../hooks/useSignup";
// import "../styles/AuthForm.css";

// const AuthForm = () => {
//   const [loginInputs, setLoginInputs] = useState({
//     username: "",
//     password: "",
//   });

//   const [signupInputs, setSignupInputs] = useState({
//     username: "",
//     email: "",
//     confirmEmail: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const { login } = useLogin();
//   const { signup } = useSignup();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     await login(loginInputs);
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     await signup(signupInputs);
//   };

//   return (
//     <div className="auth-form-container ">
//       <form
//         id="signup"
//         className="sign-up-form"
//         onSubmit={(e) => handleSignUp(e)}
//       >
//         <p className="auth-title">register</p>
//         <input
//           className="auth-form-input"
//           placeholder="username"
//           type="text"
//           value={signupInputs.username}
//           onChange={(e) =>
//             setSignupInputs({ ...signupInputs, username: e.target.value })
//           }
//         />
//         <input
//           className="auth-form-input"
//           placeholder="email"
//           type="text"
//           value={signupInputs.email}
//           onChange={(e) =>
//             setSignupInputs({ ...signupInputs, email: e.target.value })
//           }
//         />
//         <input
//           className="auth-form-input"
//           placeholder="confirm email"
//           type="text"
//           value={signupInputs.confirmEmail}
//           onChange={(e) =>
//             setSignupInputs({ ...signupInputs, confirmEmail: e.target.value })
//           }
//         />
//         <input
//           className="auth-form-input"
//           placeholder="password"
//           type="password"
//           value={signupInputs.password}
//           onChange={(e) =>
//             setSignupInputs({ ...signupInputs, password: e.target.value })
//           }
//         />
//         <input
//           className="auth-form-input"
//           placeholder="confirm password"
//           type="password"
//           value={signupInputs.confirmPassword}
//           onChange={(e) =>
//             setSignupInputs({
//               ...signupInputs,
//               confirmPassword: e.target.value,
//             })
//           }
//         />
//         <button className="auth-button">Sign up</button>
//       </form>

//       <form
//         id="login"
//         className="login-form"
//         onSubmit={(e) => handleLoginSubmit(e)}
//       >
//         <p className="auth-title">log in</p>
//         <input
//           className="auth-form-input"
//           placeholder="username"
//           type="text"
//           value={loginInputs.username}
//           onChange={(e) =>
//             setLoginInputs({ ...loginInputs, username: e.target.value })
//           }
//         />
//         <input
//           className="auth-form-input"
//           placeholder="password"
//           type="password"
//           value={loginInputs.password}
//           onChange={(e) =>
//             setLoginInputs({ ...loginInputs, password: e.target.value })
//           }
//         />

//         <button className="auth-button">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default AuthForm;

// const AuthForm = () => {
//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
//       style={{
//         backgroundImage:
//           "url(https://images.unsplash.com/photo-1519617645840-a29e3d3656c1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", // Replace with your actual starry background image
//       }}
//     >
//       {/* Mountains - Using a dark overlay gradient */}
//       <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-transparent"></div>

//       {/* Login Form Container */}
//       <div className="w-full max-w-md p-8 space-y-6 relative z-10">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-white mb-8">Welcome back</h1>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <input
//               type="email"
//               placeholder="Email address"
//               className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
//             />
//           </div>

//           <div className="flex items-center space-x-2 bg-black/30 rounded-lg border border-gray-600 p-2 backdrop-blur-sm">
//             <input
//               type="checkbox"
//               className="w-4 h-4 border border-gray-300 rounded"
//             />
//             <span className="text-gray-400">I'm not a robot</span>
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Continue
//           </button>
//         </form>

//         <div className="text-center text-gray-400">
//           <span>Don't have an account? </span>
//           <a href="/signup" className="text-blue-400 hover:text-blue-300">
//             Sign up
//           </a>
//         </div>

//         <div className="space-y-3">
//           <button className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
//             <span>Continue with Google</span>
//           </button>

//           <button className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
//             <span>Continue with Microsoft Account</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../Api/Api";
import { AuthContext, useAuthContext } from "../../context/AuthContext";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNotRobot, setIsNotRobot] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuthContext(AuthContext);

  const validate = () => {
    let isValid = true;
    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!isNotRobot) {
      toast.error("Please verify that you're not a robot");
      isValid = false;
    }
    if (password.trim() === "") {
      toast.error("Please enter your password");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const data = { email, password };

    try {
      const res = await loginUserApi(data);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        //store token and user details
        // localStorage.setItem("token", res.data.token);
        const userData = res.data.userData;
        // localStorage.setItem("user", JSON.stringify(userData));

        loginUser(userData, res.data.token);

        //redirect based on role or de3fault to home page
        if (userData.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard"); //make it else navigate to the dashboard page
        }
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      // style={{
      //   backgroundImage:
      //     "url(https://images.unsplash.com/photo-1519617645840-a29e3d3656c1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      // }}
    >
      {/* <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-transparent"></div> */}

      <div className="w-full max-w-md p-8 space-y-6 relative ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Welcome back</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{emailError}</p>
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
              <p className="mt-1 text-xs text-red-500">{setPasswordError}</p>
            )}
          </div>
          <div className="flex items-center space-x-2 bg-black/30 rounded-lg border border-gray-600 p-2 backdrop-blur-sm">
            <input
              type="checkbox"
              checked={isNotRobot}
              onChange={(e) => setIsNotRobot(e.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded"
            />
            <span className="text-gray-400">I'm not a robot</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </button>
        </form>

        <div className="text-center text-gray-400">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <span>Continue with Microsoft Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
