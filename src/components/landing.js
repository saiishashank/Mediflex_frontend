import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import classes from '../css/landing.module.css';
import img from '../images/logoo.png'

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      


  <div className={`${classes.container}`}>
    <header>
      <nav>
        <img
          src={img}
          className={`${classes.logocom}`}
          alt=""
      
        />
        <div className={`${classes.boxnav}`}>
          <button className='btn btn-info' onClick={()=>{navigate("/login1")}}>
          <span>Login</span>
          </button>
          <button className='btn btn-info' onClick={()=>{navigate("/signin1")}}>
            <span>SignUp</span>
          </button>
        </div>
      </nav>
    </header>
    <section className={`${classes.top}`}>
      <div className={`${classes.blockone}`}>
        <h1>Simplify Your Healthcare</h1>
        <h3>Effortless appointment scheduling at your fingertips.</h3>
        <button className='btn btn-info'>
         <span>Start Now</span>
        </button>
      </div>
      
    </section>
    <div className={`${classes.contact}`}>
      <div className={`${classes.one}`}>
        <h1>Contact Us</h1>
        <div className={`${classes.x}`}>
          <img src="" alt="" srcset="" />
          <h3>Email</h3>
          <h4>support@medischedule.com</h4>
        </div>
        <div className={`${classes.x}`}>
          <img src="" alt="" srcset="" />
          <h3>Phone</h3>
          <h4>+1 (555) 123-4567</h4>
        </div>
      </div>
     
    </div>
    <footer>&copy; by Team Happy Hacking</footer>
  </div>


    </div>
  )
}

export default Landing