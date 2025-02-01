import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateRecords.css"; // Ensure this CSS file exists

const UpdateRecords = () => {
  const navigate = useNavigate();
  const existingRecord = JSON.parse(localStorage.getItem("healthRecord"));
  const [formData, setFormData] = useState(existingRecord || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("healthRecord", JSON.stringify(formData));
    alert("Health record updated successfully!");
    navigate("/health-records/dashboard");
  };

  return (
    <div className="update-records-container">
      <h2 className="update-title">Update Health Record</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Medical History:
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory || ""}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </label>
        <label className="form-label">
          Allergies:
          <textarea
            name="allergies"
            value={formData.allergies || ""}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </label>
        <label className="form-label">
          Prescriptions:
          <textarea
            name="prescriptions"
            value={formData.prescriptions || ""}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </label>
        <button type="submit" className="submit-btn">Update Record</button>
      </form>
    </div>
  );
};

export default UpdateRecords;
