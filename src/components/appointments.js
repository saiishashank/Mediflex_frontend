import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../css/appointments.module.css";
import axios from "axios";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]); // Array to store doctors
  const [datee, setdate] = useState(""); // State to store selected date

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    axios
      .get("https://mediflex.onrender.com/api/doctor/", config)
      .then((data) => {
        const doctors = data.data.allUser;
        console.log(doctors);
        setAppointments(doctors); // Update appointments state
      })
      .catch((error) => console.error(error)); // Handle errors
  }, []);

  const handledate = (e) => {
    setdate(e.target.value);
  };

  const handleaddDate = (doctorId,doctorName) => {
    axios
      .patch(
        `http://localhost:8000/api/doctor/update/${doctorId}`,
        {
          date: datee, // Send selected date with the request
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
    console.log(
      `Appointment date ${datee} added for doctor with ID: ${doctorId}`
    );
    alert(`your appointement successfull to consult doctor ${doctorName}`);
    navigate('/home')
  };
  const navigate=useNavigate();
  return (
    <div className="container">
     <nav className='d-flex justify-content-between'>
      <h2 className='m-3'>Mediflex</h2>
      <button onClick={()=>navigate('/home')} className='btn '><Icon path={mdiArrowLeft} size={1.3} /></button>
    </nav>
      <h1 className="text-center">Make Appointment</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">
              Doctor Name
            </th>
            <th scope="col" className="text-center">
              Contact Number
            </th>
            <th scope="col" className="text-center">
              Enter Date
            </th>
            <th scope="col" className="text-center">
              Get Appointment
            </th>
          </tr>
        </thead>
        {appointments.length > 0 ? (
          <tbody>
            {appointments.map((doctor) => (
              <tr key={doctor._id}>
                <td className="text-center">{doctor.name}</td>
                <td className="text-center">{doctor.contactnumber}</td>
                <td className="text-center">
                  <input
                    type="date"
                    onChange={handledate}
                    className="form-control"
                  />
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-success"
                    onClick={() => handleaddDate(doctor._id,doctor.name)}
                  >
                    Get Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="text-center">No appointments found</p>
        )}
      </table>
    </div>
  );
};

export default Appointments;
