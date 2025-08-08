import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import the context

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login1 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const Submit = async (cred) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/login", cred);
      
      const { token, data: { user } } = response.data;

      // Use the context to handle login state and storage
      login(user, token, 'patient');

      navigate("/home");

    } catch (error) {
      console.error("User login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(Submit)}>
        <Title>User Login</Title>
        <Input
          type="email"
          placeholder="Enter your Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className='text-danger'>*Email is required</p>}
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className='text-danger'>*Password is required</p>}
        <p>Don't have an account? <Link to="/user-signup">Sign up</Link></p>
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Login1;