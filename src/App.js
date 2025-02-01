// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"; // Login component
import SignUp from "./components/SignUp"; // SignUp component
import Dashboard from "./components/Dashboard"; // Dashboard component
import NearbyHospitalPage from "./components/NearbyHospitalPage"; // Nearby Hospital Locator page
import HealthRecordPage from "./components/HealthRecordPage"; // Main Health Record page
import HealthRecordDashboard from "./components/HealthRecordDashboard"; // Dashboard for health records
import ViewRecords from "./components/ViewRecords"; // View Records page
import UpdateRecords from "./components/UpdateRecords"; // Update Records page
import AppointmentDashboard from "./components/AppointmentDashboard";
import BookAppointment from "./components/BookAppointment";
import CancelAppointment from "./components/CancelAppointment";
import RescheduleAppointment from "./components/RescheduleAppointment";
import UpdateProfile from "./components/UpdateProfile";
import HealthArticles from "./components/HealthArticles";
import MedicalLifestyleTips from "./components/MedicalLifestyleTips";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitalPage />} />
        <Route path="/health-records" element={<HealthRecordPage />} />
        <Route path="/health-records/dashboard" element={<HealthRecordDashboard />} />
        <Route path="/health-records/view" element={<ViewRecords />} />
        <Route path="/health-records/update" element={<UpdateRecords />} />
        <Route path="/appointments" element={<AppointmentDashboard />} />
        <Route path="/appointments/book" element={<BookAppointment />} />
        <Route path="/appointments/cancel" element={<CancelAppointment />} />
        <Route path="/appointments/reschedule" element={<RescheduleAppointment />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/health-articles" element={<HealthArticles />} />
        <Route path="/Medication-Lifestyle-awareness" element={<MedicalLifestyleTips />} />
      </Routes>
    </Router>
  );
}

export default App;

