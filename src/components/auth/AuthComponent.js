import React, { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export const UserContext = createContext(null);

const AuthComponent = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter an email and password");
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      if (userCredential.user) {
        setErrorMessage("");
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userId", userCredential.user.uid);
        }
        onAuthSuccess();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      if (userCredential.user) {
        setErrorMessage("");
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userId", userCredential.user.uid);
        }
        onAuthSuccess();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    // Clear the user from local storage
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userId");
    auth.signOut();
    setUser(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Determine whether to log in or sign up based on some state
    if (isLoginMode) {
      await handleLogIn();
    } else {
      await handleSignUp();
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // During app initialization or on the auth state listener:
  const handleAuthStateChange = (user) => {
    if (user || localStorage.getItem("rememberMe") === "true") {
      // User is remembered, so log them in automatically
      // Fetch additional user details if necessary using the stored user ID
      setUser(user);
      onAuthSuccess();
    } else {
      // No user is logged in or remembered, so show the auth form
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="auth-form-container">
        <h1 className="auth-header font-medium xs:text-2xl sm:text-3xl md:text-4xl">
          {isLoginMode ? "Welcome back!" : "Create your account"}
        </h1>
        <div className="auth-form">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black"
            />

            {!isLoginMode && (
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Re-enter Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="text-black"
              />
            )}
            <div className="flex flex-col">
              <label className="remember-me-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <button type="submit">
                {isLoginMode ? "Log In" : "Sign Up"}
              </button>
              <p className="toggle-mode" onClick={toggleMode}>
                {isLoginMode
                  ? "New here? Sign up"
                  : "Already have an account? Log in"}
              </p>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default AuthComponent;
