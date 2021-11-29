import React from 'react';
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { addUser } = bindActionCreators(actionCreators, dispatch);

  const onSubmit = async data => {
    const response = await fetch('/db/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const userData = await response.json()
    localStorage.setItem('retroToken', JSON.stringify(userData.token));
    addUser({name: userData.user.name, id: userData.user.id});
    navigate('/');
  };
  
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="First name" {...register("firstName", {required: true, min: 3})} />
        <input type="text" placeholder="Last name" {...register("lastName", {required: true, min: 3})} />
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="text" placeholder="Password" {...register("password", {required: true, min: 6})} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUp
