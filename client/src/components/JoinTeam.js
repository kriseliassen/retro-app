import React from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JoinTeam = ({ teams }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    const response = await fetch(`/db/users/${user.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const userData = await response.json()
    addUser({user: userData});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("teamName", { required: true })}>
        {teams && teams.map(team => (
        <option value={team.name}>{team.name}</option>
        ))}
      </select>
      {errors.teamName?.type === 'required' && "Please select a team"}

      <input type="submit" value="Join team"/>
    </form>
);
}

export default JoinTeam