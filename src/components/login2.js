import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div` display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); `;
const LoginForm = styled.form` background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); width: 300px; display: flex; flex-direction: column; align-items: center; `;
const Title = styled.h2` margin-bottom: 1.5rem; color: #333; `;
const Input = styled.input` width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; `;
const Button = styled.button` width: 100%; padding: 0.75rem; border: none; border-radius: 5px; background-color: #007bff; color: white; font-size: 1rem; cursor: pointer; `;

function Login2() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const Submit = async (cred) => {
    try {
      const response = await axios.post("https://mediflex.onrender.com/api/doctor/login", cred);
      const { token, data: { user } } = response.data;
      
      login(user, token, 'doctor');
      
      navigate("/dochome");
    } catch (error) {
      console.error("Doctor login failed:", error);
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(Submit)}>
        <Title>Doctor Login</Title>
        <Input type="email" placeholder="Enter your Email" {...register("email", { required: true })} />
        {errors.email && <p className='text-danger'>*Email is required</p>}
        <Input type="password" placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <p className='text-danger'>*Password is required</p>}
        <p>Don't have an account? <Link to="/doctor-signup">Sign up</Link></p>
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Login2;