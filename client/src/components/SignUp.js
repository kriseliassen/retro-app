import React from 'react';
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate, Link } from 'react-router-dom';
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
    addUser({ name: userData.user.name, id: userData.user.id });
    navigate('/');
  };

  return (
    <div className="Signup__container">
      <h1 className="logo">
        Retro
      </h1>
      <div className="Form__container">
        <h2 className="Form__header">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="Form">
          <input 
            type="text" 
            placeholder="First name" 
            {...register("firstName", { required: true, min: 3 })}
            className="Form__input"/>
          <input 
            type="text" 
            placeholder="Last name" 
            {...register("lastName", { required: true, min: 3 })}
            className="Form__input"/>
          <input 
            type="text" 
            placeholder="Email" 
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}  className="Form__input"/>
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true, min: 6 })}  
            className="Form__input"/>

          <input 
          type="submit" 
          className="Form__button"/>
        </form>
        <Link 
          to="/login"
          className="Form__link">
          Already have an account? Log in!
        </Link>
      </div>
    </div>
  );
}

export default SignUp
