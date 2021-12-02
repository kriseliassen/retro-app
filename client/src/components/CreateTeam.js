import React from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const CreateTeam = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    const token = localStorage.getItem('retroToken');
    const response = await fetch(`/db/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({...data, userId: user.user.id })
    })
    
    const userData = await response.json()
    addUser(userData);
  };
  return (
    <div className="CreateTeam__container">
      <form onSubmit={handleSubmit(onSubmit)} className="CreateTeam__form">
        <input 
          type="text" 
          placeholder="Team name" 
          {...register("teamName", {required: true, maxLength: 80})} 
          autoComplete="off" 
          className="CreateTeam__form--input"/>
        {errors.teamName?.type === 'required' && "Please enter a team name"}
        <input 
        type="submit" 
        value="Create team"
        className="btn-form"/>
      </form>
    </div>
  )
}

export default CreateTeam
