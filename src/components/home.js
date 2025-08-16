import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import classes from '../css/home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import img1 from '../images/logoo.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Uploadoc from './uploadoc'; 

function Home() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const userName = user ? user.name : 'Guest';
    
    const [bpLevel, setBpLevel] = useState('');
    const [sugarLevel, setSugarLevel] = useState('');
    const [date, setDate] = useState(new Date());

    const handleAddBpLevel = () => {
        if (!bpLevel) return alert("Please enter a BP value.");
        axios.patch('https://mediflex.onrender.com/api/user/Bp', { bp: bpLevel })
            .then(res => {
                alert('BP level updated!');
                setBpLevel('');
            }).catch(err => console.error(err));
    };
    
    const handleAddSugarLevel = () => {
        if (!sugarLevel) return alert("Please enter a sugar value.");
        axios.patch('https://mediflex.onrender.com/api/user/Sugar', { sugar: sugarLevel })
            .then(res => {
                alert('Sugar level updated!');
                setSugarLevel('');
            }).catch(err => console.error(err));
    };
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`${classes.container}`}>
            <nav className={`${classes.nav}`}>
                <div><img src={img1} alt="Logo" className={`${classes.logo}`} /></div>
                <button onClick={handleLogout} className={`${classes.logout}`}>Logout</button>
            </nav>
            <div className={`${classes.outer}`}>
                <div className={`${classes.username}`}>Welcome, {userName}</div>
                <div className={`${classes.inner}`}>
                    <Calendar onChange={setDate} value={date} className={`${classes.cal}`} />
                    <i>Mediflex simplifies your health journey.</i>
                </div>
            </div>
            
            <Uploadoc /> {/* Assuming Uploadoc is the reports component */}
            
            <div className={`${classes.appointment}`}>
                <div>Get a quick appointment with the best doctors</div>
                <div className={`${classes.aptbttn}`}>
                    <button className={`btn btn-success ${classes.aptbtn}`} onClick={() => navigate("/appointments")}>Get Appointment</button>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;