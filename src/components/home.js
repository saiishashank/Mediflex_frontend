import React,{useEffect,useState} from 'react'
import classes from '../css/home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import img1 from '../images/logoo.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {PieChart,Pie} from 'recharts';
import Uploadoc from './uploadoc';
function Home() {
  
    const navigate = useNavigate();
    let user = useSelector(state => state.doc);

    let userName = '';
    if (user && user.length > 0) {
       userName = user[0].name
       }
     
    const [bpLevel, setBpLevel] = useState('');
    const [sugarLevel, setSugarLevel] = useState('');
  
    const handleBpLevelChange = (e) => {
      setBpLevel(e.target.value);
    };
  
    const handleSugarLevelChange = (e) => {
      setSugarLevel(e.target.value);
    };
    const handleAddBpLevel = async () => {
      axios.patch('https://mediflex.onrender.com/api/user/Bp', {
        // Extra data to send with the request
          bp:bpLevel
      }, {
        // Config object with JWT token and other settings
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Replace with your JWT token
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.error(error));
 
     
        console.log(`BP Level: ${bpLevel}`);
      };
    
      const handleAddSugarLevel = () => {
        axios.patch('https://mediflex.onrender.com/api/user/Sugar', {
          // Extra data to send with the request
            sugar:sugarLevel
        }, {
          // Config object with JWT token and other settings
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Replace with your JWT token
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => console.error(error));
      
        console.log(`Sugar Level: ${sugarLevel}`);
      };
    
        const [date, setDate] = useState(new Date());
      
        const onChange = (newDate) => {
          setDate(newDate);
        };
        const data02 = [
          { name: 'Shasank', Svalue: 200 },
          { name: 'charan', Svalue: 150 },
          { name: 'varshit', Svalue: 100 },
          { name: 'manoj', Svalue: 160 },
        ];
         const data01 = [
           { name: 'shasank', bvalue: 120/90 },
           { name: 'charan', bvalue: 180/80 },
           { name: 'varshit', bvalue: 100/80 },
           { name: 'manoj', bvalue: 160 }
         ];
  return (

    <div className={`${classes.container}`}>
      <nav className={`${classes.nav}`}>
        <div >
   <img src={img1} alt="" className={`${classes.logo}`}/>
        </div>
     <button onClick={()=>navigate("/")} className={`${classes.logout}`} >Logout</button>
  
</nav>
<div className={`${classes.outer}`}>

<div className={`${classes.username}`}>  {userName}</div>
<div className={`${classes.inner}`} >
<Calendar
        onChange={onChange}
        value={date}
        className={`${classes.cal}`}/>
      
<i>Mediflex platform which helps the users to make ease in taking appointments from home  </i>
</div>
</div>

<Uploadoc/>

<div className={`${classes.appointment}`}>
     <div>
        get a qiuck appointment with the best doctors
     </div>
     <div className={` ${classes.aptbttn}`}>
        <button className={`btn btn-success ${classes.aptbtn} `}onClick={()=>{navigate("/appointments")}} >Get Appointment</button>
     </div>
</div>
   <Outlet />
    </div>
  )
}

export default Home
