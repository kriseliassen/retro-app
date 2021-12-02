import React from 'react'
import { useForm } from 'react-hook-form';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const JoinTeam = ({ teams }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    const token = localStorage.getItem('retroToken');
    const response = await fetch(`/db/users/${user.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    const userData = await response.json()
    addUser(userData);
  };

  return (
    <div className="JoinTeam__container">
      <form 
        className="JoinTeam__form" 
        onSubmit={handleSubmit(onSubmit)}>
        <select {...register("teamName", { required: true })}
        className="JoinTeam__form--input">
          {teams && (teams.map(team => (
          <option 
            value={team.name}
            key={team.id}>
              {team.name}
          </option>
          )))}
        </select>
        {errors.teamName?.type === 'required' && "Please select a team"}
        <input 
          type="submit" 
          value="Join team" 
          className="btn-form"/>
      </form>
    </div>
);
}

export default JoinTeam
