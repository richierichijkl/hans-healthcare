import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email.split("@")[0]);
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/")) // Redirect to the root route (Login page)
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Hans Healthcare</h1>
          <p>Your Health, Our Priority</p>
        </div>
        <div className="user-menu">
          <img src="/images/user.svg" alt="User Icon" className="user-icon" />
          <div className="dropdown">
            <button className="dropdown-btn">
              {userName || "User"}
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
