import React, { useEffect, useState } from "react";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  // Fetching dummy doctor data from Random User API
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5&gender=male")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.results);
      });
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    // Simulating time slots for the selected doctor
    setTimeSlots([
      "9:00 AM - 10:00 AM",
      "10:30 AM - 11:30 AM",
      "1:00 PM - 2:00 PM",
      "3:00 PM - 4:00 PM",
    ]);
  };

  const handleBookAppointment = (timeSlot) => {
    alert(`Appointment booked with Dr. ${selectedDoctor.name.first} at ${timeSlot}`);
    // Save the appointment data (can be saved in localStorage or backend)
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>
      <div>
        <h3>Select a Doctor</h3>
        {doctors.map((doctor) => (
          <div key={doctor.login.uuid} onClick={() => handleDoctorSelect(doctor)}>
            <p>{doctor.name.first} {doctor.name.last} - {doctor.profession || "Doctor"}</p>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div>
          <h3>Available Time Slots for Dr. {selectedDoctor.name.first}</h3>
          {timeSlots.map((slot, index) => (
            <button key={index} onClick={() => handleBookAppointment(slot)}>
              {slot}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
