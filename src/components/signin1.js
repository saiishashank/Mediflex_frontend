import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import classes from '../css/signin.module.css';

function Signin1() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async (cred) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/signup", cred);
      const { token, data: { user } } = response.data;
      
      // Use context to log the new user in immediately
      login(user, token, 'patient');
      
      navigate("/home");
    } catch (error) {
      console.error("User signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className={`${classes.container}`}>
      <div className="fw-bold display-3 text-center text-Primary mb-4">User Signup</div>
      <Form className="mx-auto w-50" onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your Name" {...register("name", { required: true })} />
          {errors.name && <p className='text-danger'>*Username is required</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your Email" {...register("email", { required: true })} />
          {errors.email && <p className='text-danger'>*Email is required</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your Password" {...register("password", { required: true })} />
          {errors.password && <p className='text-danger'>*Password is required</p>}
        </Form.Group>
        <Button className="btn-secondary" type="submit">Submit</Button>
      </Form>
      <div className={`${classes.btns}`}>
        <div className={`${classes.needouter}`}>
          <div className={`${classes.btns}`}>
            Already a user? <Link to="/user-login" className={`${classes.links}`}>Login</Link>
          </div>
          <div className={`${classes.needs}`}>
            Are you a doctor? <Link to="/doctor-login" className={`${classes.links}`}>Doctor Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin1;