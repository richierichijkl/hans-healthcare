import React, { useState, useEffect } from "react";

const RescheduleAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newTimeSlot, setNewTimeSlot] = useState("");

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleReschedule = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment === selectedAppointment
        ? { ...appointment, time: newTimeSlot }
        : appointment
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    alert("Appointment rescheduled successfully!");
  };

  return (
    <div className="reschedule-appointment">
      <h2>Reschedule Appointment</h2>
      <div>
        <h3>Select an Appointment to Reschedule</h3>
        {appointments.map((appointment, index) => (
          <div key={index} onClick={() => setSelectedAppointment(appointment)}>
            <p>Dr. {appointment.doctor} - {appointment.time}</p>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div>
          <h3>Select a New Time Slot</h3>
          <input
            type="text"
            value={newTimeSlot}
            onChange={(e) => setNewTimeSlot(e.target.value)}
            placeholder="Enter new time slot"
          />
          <button onClick={handleReschedule}>Reschedule</button>
        </div>
      )}
    </div>
  );
};

export default RescheduleAppointment;
