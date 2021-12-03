import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Error from './Error';
import '../styles/Login.css'

const Login = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addUser } = bindActionCreators(actionCreators, dispatch);

  const onSubmit = async data => {
    try {
      const response = await fetch(`${SERVER_URL}/db/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      })
      const userData = await response.json()
      if(!userData.token) {
        setError(userData.message);
        return;
      }
      localStorage.setItem('retroToken', JSON.stringify(userData.token));
      addUser(userData);
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="Login__container">
      <h1 className="logo">
        Retro
      </h1>
      <div className="Login__form__container">
        <h2 className="Login__form__header">
          Log in
        </h2>
        <form 
          onSubmit={handleSubmit(onSubmit)} className="Login__form">
          <input 
          type="text" 
          placeholder="Email" 
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}  className="Login__form__input"/>
          {errors.email?.type === 'required' && "Email is required"}
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true, min: 6 })}  className="Login__form__input"/>
            {errors.password?.type === 'required' && "Password is required"}
          <input 
            type="submit"
            className="Login__form__button"/>
        </form>
        <Link 
          to="/signup" 
          className="Login__form__link">
          No account? Sign up!
        </Link>
      </div>
      {error && <Error message={error} setError={setError}/>}
    </div>
  );
}

export default Login
