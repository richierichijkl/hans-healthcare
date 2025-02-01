import React, { useState, useEffect } from "react";

const CancelAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleCancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    alert("Appointment canceled successfully!");
  };

  return (
    <div className="cancel-appointment">
      <h2>Cancel Appointment</h2>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment, index) => (
            <div key={index}>
              <p>Dr. {appointment.doctor} - {appointment.time}</p>
              <button onClick={() => handleCancelAppointment(index)}>Cancel</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments to cancel.</p>
      )}
    </div>
  );
};

export default CancelAppointment;
