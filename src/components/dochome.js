import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Dochome() {
  const [doctor, setDoctor] = useState({}); // State to store doctor details
  const [appointments, setAppointments] = useState([]); // State for appointments array

  useEffect(() => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    axios
      .get('https://mediflex.onrender.com/api/doctor/me', config)
      .then((data) => {
        const doctors = data.data.data.data;
        setDoctor(doctors); // Update doctor state
        setAppointments(doctors.appointments || []); // Handle potential missing appointments
      })
      .catch((error) => console.error(error)); // Handle errors
  }, []);
   const navigate=useNavigate();
  return (
    <div className="container">
    <nav className='d-flex justify-content-between'>
      <h2 className='m-3'>Mediflex</h2>
      <button onClick={()=>navigate('/login2')} className='btn btn-primary'>logout</button>
    </nav>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center"></h1>
          {doctor && ( // Render only if doctor data is available
            <>
              <h3 className="text-center">Doctor Details</h3>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted">Name: {doctor.name}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted">Email: {doctor.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted">Contact Number: {doctor.contactnumber}</p>
                </div>
              </div>

              <h3 className="text-center">Appointments</h3>
              {appointments.length > 0 && ( // Check for appointments before rendering
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Appointment date</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Patient Email</th>
                      {/* Add other headers as needed based on appointment data structure */}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={appointment._id}>
                        <td>{appointment.date}</td>
                        <td>{appointment.patient?.name}</td> {/* Access patient name */}
                        <td>{appointment.patient?.email}</td> {/* Access patient email */}
                        {/* Render other appointment details here */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {appointments.length === 0 && <p className="text-center">No appointments found.</p>}
            </>
          )}
          {!doctor && <p className="text-center">Loading doctor information...</p>}  {/* Message while loading */}
        </div>
      </div>
    </div>
  );
}

export default Dochome;