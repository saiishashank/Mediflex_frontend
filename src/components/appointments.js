import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { useNavigate } from "react-router-dom";

//const API_URL = "http://localhost:8000";
const API_URL = "https://mediflex.onrender.com";

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/doctor/`)
      .then((response) => {
        setDoctors(response.data.allUser);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleDateChange = (doctorId, date) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [doctorId]: date,
    }));
  };

  const handleBookAppointment = (doctorId, doctorName) => {
    const appointmentDate = selectedDates[doctorId];

    if (!appointmentDate) {
      alert("Please select a date for the appointment.");
      return;
    }

    axios
      .patch(
        `${API_URL}/api/doctor/update/${doctorId}`,
        { date: appointmentDate }
      )
      .then((response) => {
        console.log("Appointment successful:", response.data);
        alert(`Your appointment with Dr. ${doctorName} on ${appointmentDate} is successful!`);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      });
  };

  return (
    <div className="container">
      <nav className="d-flex justify-content-between align-items-center">
        <h2 className="m-3">MediFlex</h2>
        <button onClick={() => navigate("/home")} className="btn">
          <Icon path={mdiArrowLeft} size={1.3} />
        </button>
      </nav>
      <h1 className="text-center mb-4">Make an Appointment</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center">Doctor Name</th>
              <th scope="col" className="text-center">Contact Number</th>
              <th scope="col" className="text-center">Select Date</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="text-center align-middle">{doctor.name}</td>
                  <td className="text-center align-middle">{doctor.contactnumber}</td>
                  <td className="text-center align-middle">
                    <input
                      type="date"
                      value={selectedDates[doctor._id] || ""}
                      onChange={(e) => handleDateChange(doctor._id, e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-success"
                      onClick={() => handleBookAppointment(doctor._id, doctor.name)}
                    >
                      Get Appointment
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No doctors available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;