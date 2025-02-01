import React, { useState, useEffect } from "react";
import "./AppointmentDashboard.css";

const doctorsData = [
  { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", availability: "9:00 AM - 1:00 PM" },
  { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", availability: "10:00 AM - 2:00 PM" },
  { id: 3, name: "Dr. Alice Brown", specialty: "Pediatrician", availability: "8:00 AM - 12:00 PM" },
  { id: 4, name: "Dr. Michael Johnson", specialty: "Orthopedic", availability: "11:00 AM - 3:00 PM" },
  { id: 5, name: "Dr. Emily White", specialty: "Neurologist", availability: "1:00 PM - 5:00 PM" },
  { id: 6, name: "Dr. Daniel Green", specialty: "General Physician", availability: "2:00 PM - 6:00 PM" },
];

const timeSlotsData = [
  { id: 1, time: "9:00 AM - 10:00 AM" },
  { id: 2, time: "10:00 AM - 11:00 AM" },
  { id: 3, time: "11:00 AM - 12:00 PM" },
  { id: 4, time: "12:00 PM - 1:00 PM" },
  { id: 5, time: "1:00 PM - 2:00 PM" },
  { id: 6, time: "2:00 PM - 3:00 PM" },
  { id: 7, time: "3:00 PM - 4:00 PM" },
  { id: 8, time: "4:00 PM - 5:00 PM" },
];

const AppointmentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleBookAppointment = (doctor, timeSlot) => {
    const newAppointment = {
      id: Date.now(),
      doctor,
      timeSlot,
      status: "Booked",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    alert(`Appointment booked with Dr. ${doctor.name} at ${timeSlot.time}`);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter((appt) => appt.id !== appointmentId);
    setAppointments(updatedAppointments);
    alert("Appointment canceled successfully.");
  };

  const handleRescheduleAppointment = (appointmentId, newTimeSlot) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === appointmentId ? { ...appt, timeSlot: newTimeSlot } : appt
    );
    setAppointments(updatedAppointments);
    alert("Appointment rescheduled successfully.");
  };

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="appointment-dashboard">
      <h1 className="dashboard-title">Appointment Dashboard</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by specialty (e.g., Cardiologist)"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="booked-appointments">
        <h2>Your Appointments</h2>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <p><strong>Doctor:</strong> {appt.doctor.name}</p>
              <p><strong>Specialty:</strong> {appt.doctor.specialty}</p>
              <p><strong>Time Slot:</strong> {appt.timeSlot.time}</p>
              <div className="appointment-actions">
                <button
                  className="btn cancel-btn"
                  onClick={() => handleCancelAppointment(appt.id)}
                >
                  Cancel
                </button>
                <button
                  className="btn reschedule-btn"
                  onClick={() =>
                    handleRescheduleAppointment(
                      appt.id,
                      timeSlotsData[Math.floor(Math.random() * timeSlotsData.length)]
                    )
                  }
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>

      <div className="available-appointments">
        <h2>Available Doctors</h2>
        <div className="doctors-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <h3>{doctor.name}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Availability:</strong> {doctor.availability}</p>
                <div className="time-slots">
                  {timeSlotsData.map((timeSlot) => (
                    <button
                      key={timeSlot.id}
                      className="btn book-btn"
                      onClick={() => handleBookAppointment(doctor, timeSlot)}
                    >
                      {timeSlot.time}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found for the given specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;

