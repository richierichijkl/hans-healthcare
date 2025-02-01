import React from "react";
import { useNavigate } from "react-router-dom";
import "./HealthRecordDashboard.css"; // Ensure this file exists

function HealthRecordDashboard() {
  const navigate = useNavigate();

  return (
    <div className="health-record-dashboard">
      <h2 className="dashboard-title">Health Records Dashboard</h2>
      <p className="dashboard-description">
        Select an option below to manage your health records.
      </p>
      <div className="dashboard-buttons">
        <button
          className="dashboard-btn"
          onClick={() => navigate("/health-records/view")}
        >
          View Records
        </button>
        <button
          className="dashboard-btn"
          onClick={() => navigate("/health-records/update")}
        >
          Update Records
        </button>
      </div>
    </div>
  );
}

export default HealthRecordDashboard;
