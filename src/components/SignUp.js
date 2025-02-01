import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const auth = getAuth(); // Firebase auth instance
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (err) {
      // Set error message if sign-up fails
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Bind email state
          required
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Bind password state
          required
        />
        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </form>
      {/* Error message */}
      {error && <p>{error}</p>}
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default SignUp;
