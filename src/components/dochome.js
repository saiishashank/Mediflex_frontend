import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Dochome() {
    const { user, logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.appointments) {
            setAppointments(user.appointments);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    if (!user) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    return (
        <div className="container">
            <nav className='d-flex justify-content-between align-items-center'>
                <h2 className='m-3'>Mediflex</h2>
                <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
            </nav>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h3 className="text-center">Doctor Details</h3>
                    <div className="row">
                        <div className="col-md-6"><p><strong>Name:</strong> {user.name}</p></div>
                        <div className="col-md-6"><p><strong>Email:</strong> {user.email}</p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><p><strong>Contact:</strong> {user.contactnumber}</p></div>
                        <div className="col-md-6"><p><strong>Hospital:</strong> {user.hospitalname}</p></div>
                    </div>

                    <h3 className="text-center mt-4">Appointments</h3>
                    {appointments.length > 0 ? (
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Appointment Date</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Patient Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td>{appointment.patient?.name || 'N/A'}</td>
                                        <td>{appointment.patient?.email || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dochome;