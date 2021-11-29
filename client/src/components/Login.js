import React from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const Login = () => {
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
    localStorage.setItem('retroToken', JSON.stringify(userData.token));
    addUser({name: userData.user.name, id: userData.user.id});
    navigate('/');
  };
  

  
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="password" placeholder="Password" {...register("password", {required: true, min: 6})} />

        <input type="submit" />
      </form>
      <Link to="/signup">No account? Sign up!</Link>
    </div>
  );
}

export default Login
