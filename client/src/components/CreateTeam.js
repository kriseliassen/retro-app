import React from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const CreateTeam = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      const token = localStorage.getItem('retroToken');
      const response = await fetch(`${SERVER_URL}/db/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({...data, userId: user.user.id })
      })
      
      const userData = await response.json()
      addUser(userData);
    } catch(err) {
      console.log(err)
    }
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
