import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li onClick={() => navigate("/nearby-hospitals")}>
                <span className="icon">🏥</span> Nearby Hospitals
              </li>
              <li onClick={() => navigate("/health-records/dashboard")}>
                <span className="icon">📋</span> Health Records
              </li>
              <li onClick={() => navigate("/appointments")}>
                <span className="icon">📅</span> Book Appointment
              </li>
              <li onClick={() => navigate("/update-profile")}>
                <span className="icon">⚙️</span> Update Profile
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h1>Welcome to Hans Healthcare</h1>
          <p>Your health, our priority. Explore features to get started.</p>
          <div className="card-grid">
            <div className="card medical-card" onClick={() => navigate("/health-articles")}>
              <h3>Health Articles</h3>
              <p>Explore the latest in health and wellness.</p>
            </div>
            <div className="card medical-card" onClick={() => navigate("/symptom-checker")}>
              <h3>Symptom Checker</h3>
              <p>Get insights about your symptoms instantly.</p>
            </div>
            <div
              className="card educational-card"
              onClick={() => navigate("/medication-lifestyle-awareness")}
            >
              <h3>Medication Awareness</h3>
              <p>Learn about medications and lifestyle tips.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
