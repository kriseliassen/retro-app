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
    const response = await fetch(`/db/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, userId: user.user.id })
    })
    
    const userData = await response.json()
    console.log('userdata', userData)
    addUser({user: userData});
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Team name" {...register("teamName", {required: true, maxLength: 80})} />
      {errors.teamName?.type === 'required' && "Please enter a team name"}
      <input type="submit" value="Create team"/>
    </form>
  )
}

export default CreateTeam
