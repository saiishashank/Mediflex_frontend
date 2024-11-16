// src/components/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { adduser } from '../store/slice';
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const Signin2 = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const Submit = async(cred) => {
    let response= await axios.post("https://mediflex.onrender.com/api/doctor/signup",cred)
    dispatch(adduser(cred));
      console.log(adduser(cred))
      console.log(response)
     localStorage.setItem("jwt",response.data.token)
    
    Navigate("/dochome")

  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(Submit)}>
        <Title>Sign up </Title>
        <Input
          type="text"
          placeholder=" Enter your userName"
          {...register("name",{required:true})}
        />
        {errors.Name?.type=="required" && <p className='text-danger'>*Username compulsory</p>}
        <Input
          type="email"
          placeholder=" Enter your Email"
          {...register("email",{required:true})}
        />
        {errors.Email?.type=="required" && <p className='text-danger'>*Username compulsory</p>}
        <Input
          type="password"
          placeholder="Password"
          {...register("password",{required:true})}
        />
        {errors.Password?.type=="required" && <p className='text-danger'>*Username compulsory</p>}
        
        <Input
          type="text"
          placeholder="Enter your Hospital Name"
          {...register("hospitalname",{required:true})}
        />
        {errors.HospitalName?.type=="required" && <p className='text-danger'>*HospitalName compulsory</p>}
        <Input
          type="number"
          placeholder="Enter your Phone Number"
          {...register("contactnumber",{required:true})}
        />
        {errors.PhoneNumber?.type=="required" && <p className='text-danger'>*PhoneNumber compulsory</p>}
        Already a customer? <a href="/login1">Login</a>
        
        <Button type="submit">Sign up</Button>
      </LoginForm>
    </Container>
  );
};

export default Signin2;