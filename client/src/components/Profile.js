import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import JoinTeam from './JoinTeam';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const response = await fetch('/db/teams');
    const teamData = await response.json();
    setTeams(teamData)
  }

  useEffect(() => {
    getTeams()
  }, [])

  const logOut = () => {
    localStorage.removeItem('retroToken')
    navigate('/login')
  }

  const getUserData = async (token) => {
    let resp = await fetch('/db/user', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
    const user = await resp.json();
  
    if (user.error) {
      logOut();
      return;
    }
    addUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('retroToken')
    if(!token) {
      navigate('/login')
    } else if (!user.user) {
      getUserData(token)
    }
  }, []);
  return (
    <div>
      <button onClick={logOut}>Log out</button>
      Profile
      {user.user ? <h1>Hello, {user.user.first_name}</h1> : ''}
      {user.user ? <h1>Your team is {user.user.team_name}</h1> : ''}
      {(teams && user.user.team_name === null) && <JoinTeam teams={teams} />}
    </div>
  )
}

export default Profile
