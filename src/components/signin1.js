import React from 'react'
import {useForm} from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import classes from '../css/signin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adduser } from '../store/slice'
import {useDispatch} from 'react-redux';

function Signin1() {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const Navigate = useNavigate()
  const dispatch=useDispatch();
  const submit = async (cred) => {
    try {
    //  console.log(cred);
      const response = await axios.post("https://mediflex.onrender.com/api/user/signup", cred);
      //console.log(response.data);
      dispatch(adduser(cred));
      console.log(adduser(cred)) ; 
      if(response.status === 200)
        {
        //  console.log(response.data.token);
              localStorage.setItem('jwt',response.data.token)
      //     const user = response.data;
      // localStorage.setItem("user",...user);
      // console.log(localStorage.getItem(`user`));
          Navigate("/home")
        }
   
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. display an error message to the user
    }
    
   
  };
  return (
    <div className={`${classes.container}`}>
      <div className="fw-bold display-3 text-center text-Primary mb-4">Sign up</div>
      <Form className="mx-auto w-50 " onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text"  placeHolder="Enter the UserName" {...register("name",{required:true})}/>
          {errors.username && <p className='text-danger'>*Username compulsory</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeHolder="Enter the UserName" {...register("password",{required:true})}/>
          {errors.password && <p className='text-danger'>*Password compulsory</p>}
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeHolder="Enter the City" {...register("City",{required:true})}/>
          {errors.city && <p>*Password compulsory</p>}
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeHolder="Enter the Email" {...register("email",{required:true})}/>
          {errors.Email && <p>*Password compulsory</p>}
        </Form.Group>
        <Button className="btn-Secondary" type="submit" >Submit</Button>
      </Form>
        <div className={`${classes.btns}`}>
        <div className={`${classes.needouter}`} >
        <div className={`${classes.btns}`}>
          already a user? <a className={`${classes.links}`} href="/login1">login</a>
        </div>
      <div className={`${classes.needs}`}>
         doctor login <a className={`${classes.links}`}  href="/login1"> login</a>
      </div>
      </div>
      </div>
    </div>
  )
}
export default Signin1;