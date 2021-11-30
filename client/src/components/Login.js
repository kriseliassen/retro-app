import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Error from './Error';
import '../styles/Login.css'

const Login = () => {
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addUser } = bindActionCreators(actionCreators, dispatch);

  const onSubmit = async data => {
    const response = await fetch('/db/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const userData = await response.json()
    if(!userData.token) {
      setError(userData.message);
      return;
    }
    localStorage.setItem('retroToken', JSON.stringify(userData.token));
    addUser({ name: userData.user.name, id: userData.user.id });
    navigate('/');
  };

  return (
    <div className="Login__container">
      <h1 className="logo">
        Retro
      </h1>
      <div className="Form__container">
        <h2 className="Form__header">
          Log in
        </h2>
        <form 
          onSubmit={handleSubmit(onSubmit)} className="Form">
          <input 
          type="text" 
          placeholder="Email" 
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}  className="Form__input"/>
          {errors.email?.type === 'required' && "Email is required"}
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true, min: 6 })}  className="Form__input"/>
            {errors.password?.type === 'required' && "Password is required"}
          <input 
            type="submit"
            className="Form__button"/>
        </form>
        <Link 
          to="/signup" 
          className="Form__link">
          No account? Sign up!
        </Link>
      </div>
      {error && <Error message={error} setError={setError}/>}
    </div>
  );
}

export default Login
