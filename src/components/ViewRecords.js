import React from "react";
import "./ViewRecords.css"; // Ensure this CSS file exists

const ViewRecords = () => {
  const record = JSON.parse(localStorage.getItem("healthRecord"));

  if (!record) {
    return (
      <div className="view-records-container">
        <p>No records found. Please fill out your health record first.</p>
      </div>
    );
  }

  return (
    <div className="view-records-container">
      <h2 className="view-title">Your Health Record</h2>
      <div className="record-details">
        <p><strong>Name:</strong> {record.name}</p>
        <p><strong>Age:</strong> {record.age}</p>
        <p><strong>Medical History:</strong> {record.medicalHistory}</p>
        <p><strong>Allergies:</strong> {record.allergies}</p>
        <p><strong>Prescriptions:</strong> {record.prescriptions}</p>
      </div>
    </div>
  );
};

export default ViewRecords;
