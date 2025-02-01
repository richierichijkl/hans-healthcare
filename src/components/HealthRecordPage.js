import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthRecordPage.css";

const HealthRecordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    medicalHistory: "",
    allergies: "",
    prescriptions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("healthRecord", JSON.stringify(formData));
    alert("Health record saved successfully!");
    navigate("/health-dashboard");
  };

  return (
    <div className="health-record-page">
      <h2>Health Record Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Medical History:
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Allergies:
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Prescriptions:
          <textarea
            name="prescriptions"
            value={formData.prescriptions}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Save Record</button>
      </form>
    </div>
  );
};

export default HealthRecordPage;
