import React from 'react';
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const SignUp = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addUser } = bindActionCreators(actionCreators, dispatch);

  const onSubmit = async data => {
    try {
      const response = await fetch(`${SERVER_URL}/db/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      })
      const userData = await response.json()
      localStorage.setItem('retroToken', JSON.stringify(userData.token));
      addUser({ name: userData.user.name, id: userData.user.id, templates: [], team_name: null });
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="Signup__container">
      <h1 className="logo">
        Retro
      </h1>
      <div className="Signup__form__container">
        <h2 className="Signup__form__header">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="Signup__form">
          <input 
            type="text" 
            placeholder="First name" 
            {...register("firstName", { required: true, min: 3 })}
            autoComplete="off"
            className="Signup__form__input"/>
            {errors.firstName?.type === 'required' && "First name is required"}
          <input 
            type="text" 
            placeholder="Last name" 
            {...register("lastName", { required: true, min: 3 })}
            autoComplete="off"
            className="Signup__form__input"/>
            {errors.lastName?.type === 'required' && "Last name is required"}
          <input 
            type="text" 
            placeholder="Email" 
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}  
            autoComplete="off"
            className="Signup__form__input"/>
            {errors.email?.type === 'required' && "Email is required"}
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true, min: 6 })}
            autoComplete="off"
            className="Signup__form__input"/>
            {errors.firstName?.type === 'required' && "Password is required"}
          <input 
          type="submit" 
          className="Signup__form__button"/>
        </form>
        <Link 
          to="/login"
          className="Signup__form__link">
          Already have an account? Log in!
        </Link>
      </div>
    </div>
  );
}

export default SignUp
